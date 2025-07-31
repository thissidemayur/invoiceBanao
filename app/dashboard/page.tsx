import DashboardBlock from "../componets/Dashboard";
import EmptyState from "../componets/EmptyState";
import InvoiceGraph from "../componets/InvoiceGraph";
import RecentInvoices from "../componets/RecentInvoices";
import { prisma } from "../utils/db";
import { requiredUser } from "../utils/hooks";

async function getInvoiceData(userId: string) {
  return await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
  });
}

export default async function page() {
  const session = await requiredUser();
  const invoiceData = await getInvoiceData(session.user?.id as string);
  console.log("invoiceData: ", invoiceData);
  if (!invoiceData.length)
    return (
      <EmptyState
        title="No invoices found"
        description="Create an invoices to see it right here"
        buttonText="Create Invoice"
        href="/dashboard/invoices/create"
      />
    );
  return (
    <>
      <DashboardBlock />
      <div className="md:grid md:grid-cols-3 md:gap-8">
        <div className="col-span-2">
          <InvoiceGraph />
        </div>
        <div className="col-span-1">
          <RecentInvoices />
        </div>
      </div>
    </>
  );
}

// aschild ->
