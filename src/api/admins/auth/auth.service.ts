import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { configs } from 'src/config';
import AdminsDao from 'src/dao/admins.dao';
import { compareSync, hashSync } from 'src/library/bcrypt.library';
import { Admins } from 'src/typeorm/entities/admins.entity';
import { JwtTokenPayload } from 'src/types/common.type';
import { ONE_SECOND } from 'src/utils/constant.util';
import { LoginAdminDto } from './auth.dto';

const { secret, expiry } = configs.jwt;

@Injectable()
export class AuthService {
	constructor(
		private readonly dao: AdminsDao,
		private readonly jwt: JwtService,
	) {}
	async checkUserExistence(data: LoginAdminDto): Promise<Admins> {
		const user = await this.dao.findOne(
			{ email: data.email },
			{ relations: { role: true, gender: true } },
		);
		if (!user) throw new HttpException('Not Authenticated', HttpStatus.UNAUTHORIZED);

		const isMatched = this.comparePassword(user.password, data.password);
		if (!isMatched) throw new HttpException('Not Authenticated', HttpStatus.UNAUTHORIZED);

		return user;
	}

	comparePassword(oldPasswordHash: string, password: string): boolean {
		return compareSync(password, oldPasswordHash);
	}

	async getUser(payload: JwtTokenPayload): Promise<Admins> {
		const user = await this.dao.findOne(
			{ id: payload.userId },
			{ relations: { role: true, gender: true } },
		);
		if (!user) throw new HttpException('Not Authenticated', HttpStatus.UNAUTHORIZED);

		return user;
	}

	async generateJwtToken(payload: JwtTokenPayload): Promise<string[]> {
		const expiresIn = expiry / ONE_SECOND;
		const refreshExpiry = expiresIn * 10;
		const accessToken = await this.jwt.signAsync(payload, { expiresIn, secret });
		const refreshToken = await this.jwt.signAsync(payload, { expiresIn: refreshExpiry, secret });

		return [accessToken, refreshToken];
	}

	async setPassword(userId: string, password: string): Promise<void> {
		await this.dao.update({ id: userId }, { password: hashSync(password) });
	}
}
