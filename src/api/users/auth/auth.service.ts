import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { configs } from 'src/config';
import UsersDao from 'src/dao/users.dao';
import { compareSync, hashSync } from 'src/library/bcrypt.library';
import { Users } from 'src/typeorm/entities/users.entity';
import { JwtTokenPayload } from 'src/types/common.type';
import { ONE_SECOND } from 'src/utils/constant.util';
import { LoginUserDto, SignupUserDto } from './auth.dto';
import RolesDao from 'src/dao/roles.dao';

const { secret, expiry } = configs.jwt;

@Injectable()
export class AuthService {
	constructor(
		private readonly dao: UsersDao,
		private readonly rolesDao: RolesDao,
		private readonly jwt: JwtService,
	) {}
	async checkUserDuplication(email: string): Promise<void> {
		const user = await this.dao.findOne({ email }, { relations: { role: true, gender: true } });
		if (user) throw new HttpException('Email has already been taken', HttpStatus.CONFLICT);
	}

	async createUser(body: SignupUserDto): Promise<Users> {
		const role = await this.rolesDao.findOne({ name: 'user' });
		if (!role) throw new HttpException('Roles not found!', HttpStatus.NOT_FOUND);

		const data = {
			...body,
			password: hashSync(body.password),
			roleId: role.id,
		};
		const createdUser = await this.dao.create(data);

		return this.dao.findOne({ id: createdUser.id }, { relations: { role: true, gender: true } });
	}

	async checkUserExistence(data: LoginUserDto): Promise<Users> {
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

	async getUser(payload: JwtTokenPayload): Promise<Users> {
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
