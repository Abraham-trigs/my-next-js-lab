import { fetchFilteredInvoices } from '@/app/lib/data';

type Props = {
  searchParams:  { page?: string }
};

export default async function InvoicesPage({ searchParams }: Props) {
  const currentPage = Number(searchParams.page) || 1;
  const invoices = await fetchFilteredInvoices('', currentPage);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Invoices - Page {currentPage}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {invoices.map((invoice) => (
          <div key={invoice.id} className="p-4 border rounded shadow bg-white">
            <h2 className="text-lg font-semibold">{invoice.name}</h2>
            <p>Email: {invoice.email}</p>
            <p>Amount: ${invoice.amount}</p>
            <p>Status:
              <span className={`ml-1 font-bold ${invoice.status === 'paid' ? 'text-green-500' : 'text-yellow-500'}`}>
                {invoice.status}
              </span>
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-4">
        <a href={`?page=${currentPage - 1}`} className="p-2 bg-gray-200 rounded" disabled={currentPage === 1}>Prev</a>
        <a href={`?page=${currentPage + 1}`} className="p-2 bg-gray-200 rounded">Next</a>
        <div>{currentPage}</div>

      </div>
    </main>
  );
}
