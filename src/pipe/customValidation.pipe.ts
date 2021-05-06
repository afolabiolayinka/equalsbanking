import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: 'Validation failed',
                validate: false,
                data: this.extractErrors(errors)
            }, HttpStatus.BAD_REQUEST);
        }
        return value;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }

    private extractErrors(errors: any[]) {

        let propBag = {};

        errors.map(
            error => {
                for (const key in error.constraints) {
                    //return error.constraints[key];
                    if (Object.prototype.hasOwnProperty.call(error.constraints, key)) {
                        const msg = error.constraints[key];
                        (propBag as any)[error.property] = msg;
                    }
                }
            }
        );

        return propBag;
    }
}