import {Injectable} from '@nestjs/common';
import {AuthorizationGuard} from './authorization.guard';


@Injectable()
export class UserGuard extends AuthorizationGuard {

    constructor() {
        super(["USER"]);
    }

}
