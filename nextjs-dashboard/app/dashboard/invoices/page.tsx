import { fetchFilteredInvoices, fetchInvoicesPages } from '@/app/lib/data';
import { generatePagination } from '@/app/lib/utils';
import Link from 'next/link';
import clsx from 'clsx';

type Props = {
  searchParams: { page?: string }
};

export default async function InvoicesPage({ searchParams }: Props) {
  const currentPage = Number(searchParams.page) || 1;
  const invoices = await fetchFilteredInvoices('', currentPage);
  const totalPages = await fetchInvoicesPages('');

  const pages = generatePagination(currentPage, totalPages);

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

      {/* Pagination */}
      <div className="mt-6 flex gap-2 flex-wrap items-center">
        {/* Prev button */}
        <Link
          href={`?page=${currentPage > 1 ? currentPage - 1 : 1}`}
          className="px-3 py-1 border rounded bg-gray-100 text-gray-800"
        >
          Prev
        </Link>

        {/* Page numbers with ellipsis */}
        {pages.map((page, idx) =>
          typeof page === 'number' ? (
            <Link
              key={idx}
              href={`?page=${page}`}
              className={clsx(
                'px-3 py-1 border rounded',
                page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
              )}
            >
              {page}
            </Link>
          ) : (
            <span key={idx} className="px-3 py-1">...</span>
          )
        )}

        {/* Next button */}
        <Link
          href={`?page=${currentPage < totalPages ? currentPage + 1 : totalPages}`}
          className="px-3 py-1 border rounded bg-gray-100 text-gray-800"
        >
          Next
        </Link>
      </div>
    </main>
  );
}
