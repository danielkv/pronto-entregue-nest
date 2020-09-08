import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Companies } from "../company/company.entity";
import { PaymentMethods } from "../payment/payment.method.entity";

@Index(
	"company_payment_methods_paymentMethodId_companyId_unique",
	["companyId", "paymentMethodId"],
	{ unique: true }
)
@Index("paymentMethodId", ["paymentMethodId"], {})
@Entity("company_payment_methods", { schema: "pronto_entregue" })
export class CompanyPaymentMethods {
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

	@ManyToOne(() => Companies, (companies) => companies.companyPaymentMethods, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn([{ name: "companyId", referencedColumnName: "id" }])
	company: Companies;

	@ManyToOne(
		() => PaymentMethods,
		(paymentMethods) => paymentMethods.companyPaymentMethods,
		{ onDelete: "CASCADE", onUpdate: "CASCADE" }
	)
	@JoinColumn([{ name: "paymentMethodId", referencedColumnName: "id" }])
	paymentMethod: PaymentMethods;
}
