import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { Observable, map } from "rxjs";

export function Serialize(dtoType: ClassConstructor<any>) {
    return UseInterceptors(new SerializeInterceptor(dtoType))
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dtoType: any) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data: any) => {
                return plainToInstance(this.dtoType, data, {
                    excludeExtraneousValues: true
                })
            })
        )
    }
}