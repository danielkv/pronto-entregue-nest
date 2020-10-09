import { Field, InputType } from "@nestjs/graphql";

@InputType('CouponFilterInput')
export class CouponFilterDTO {
	@Field({ nullable: true })
    search?: string;

    @Field({ nullable: true })
    onlyActive?: boolean;

    @Field({ nullable: true })
    onlyNotExpired?: boolean;
}