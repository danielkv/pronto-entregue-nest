import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Company } from "./company.entity";
import { PaymentMethod } from "../../payment/payment.method.entity";

@Index(
	"company_payment_methods_paymentMethodId_companyId_unique",
	["companyId", "paymentMethodId"],
	{ unique: true }
)
@Index("paymentMethodId", ["paymentMethodId"], {})
@Entity("company_payment_methods")
export class CompanyPaymentMethod {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number;

	@Column("text", { name: "settings", nullable: true })
	settings: string | null;

	@Column("datetime", { name: "createdAt" })
	createdAt: Date;

	@Column("datetime", { name: "updatedAt" })
	updatedAt: Date;

	@Column("int", { name: "companyId", nullable: true })
	companyId: number | null;

	@Column("int", { name: "paymentMethodId", nullable: true })
	paymentMethodId: number | null;

	@ManyToOne(() => Company, (companies) => companies.companyPaymentMethods, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
	company: Company;

	@ManyToOne(
		() => PaymentMethod,
		(paymentMethods) => paymentMethods.companyPaymentMethods,
		{ onDelete: "CASCADE", onUpdate: "CASCADE" }
	)
	@JoinColumn([{ name: "paymentMethodId", referencedColumnName: "id" }])
	paymentMethod: PaymentMethod;
}
