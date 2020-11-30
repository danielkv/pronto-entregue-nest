import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('LoginCompany')
export class LoginCompanyDTO {
    @Field()
    companyAccessToken: string;
}
