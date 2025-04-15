import { IS_ALPHA, IsIBAN, IsIn, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateOrderDto{
    @IsString()
    @IsIn(["dry","fresh"])
    @IsNotEmpty()
    type:string

    @IsIn(["kilo","unit"])
    @IsString()
    @IsNotEmpty()
    quantityType:string

    @IsNotEmpty()
    @IsNumber()
    quantity:number

    @IsNotEmpty()
    @IsString()
    address:string
}

export class GetManyOrderQueryDto{
    @IsString()
    @IsIn(["dry","fresh"])
    @IsOptional()
    type:string

    @IsNotEmpty()
    page:number

    @IsNotEmpty()
    limit:number

    @IsOptional()
    @IsMongoId()
    user:string

    @IsOptional()
    @IsMongoId()
    acceptedBy:string

    @IsOptional()
    @IsIn(["pending","done","accepted"])
    status:string
}

export class AcceptOrderParamDto{
    @IsNotEmpty()
    @IsMongoId()
    id:string
}

export class GetOneOrderParamDto{
    @IsMongoId()
    id:string
}

export class DeleteOneOrderParamDto{
    @IsNotEmpty()
    @IsMongoId()
    id:string
}

export class FinishOrderParamDto{
    @IsNotEmpty()
    @IsMongoId()
    id:string
}