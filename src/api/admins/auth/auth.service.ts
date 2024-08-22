import { Injectable } from '@nestjs/common';
import AdminsDao from 'src/dao/admins.dao';
import { Admins } from 'src/typeorm/entities/admins.entity';

@Injectable()
export class AuthService {
	constructor(private readonly dao: AdminsDao) {}
	async login(email = 'developer.shahan@gmail.com'): Promise<Admins> {
		return this.dao.findOne({ email });
	}
}
