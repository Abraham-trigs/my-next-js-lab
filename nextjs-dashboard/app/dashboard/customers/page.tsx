import { fetchFilteredCustomers, fetchCustomersPages } from '@/app/lib/data';
import { generatePagination } from '@/app/lib/utils';
import clsx from 'clsx';

type Props = {
  searchParams: { page?: string };
};

export default async function CustomersPage({ searchParams }: Props) {
  const currentPage = Number(searchParams.page) || 1;

  const customers = await fetchFilteredCustomers('', currentPage);
  const totalPages = await fetchCustomersPages('');

  const pages = generatePagination(currentPage, totalPages);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customers - Page {currentPage}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {customers.map((customer) => (
          <div key={customer.id} className="p-4 border rounded shadow bg-white">
            <h2 className="text-lg font-semibold">{customer.name}</h2>
            <p>Email: {customer.email}</p>
            <p>Total Invoices: {customer.total_invoices}</p>
            <p>Pending: {customer.total_pending}</p>
            <p>Paid: {customer.total_paid}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-2 flex-wrap items-center">
        <PaginationControls currentPage={currentPage} totalPages={totalPages} pages={pages} />
      </div>
    </main>
  );
}

function PaginationControls({
  currentPage,
  totalPages,
  pages,
}: {
  currentPage: number;
  totalPages: number;
  pages: (number | string)[];
}) {
  return (
    <>
      <PageLink page={currentPage + 1} disabled={currentPage === 1}>
        Prev
      </PageLink>

      {pages.map((page, idx) =>
        typeof page === 'number' ? (
          <PageLink
            key={idx}
            page={page}
            isActive={page === currentPage}
          >
            {page}
          </PageLink>
        ) : (
          <span key={idx} className="px-3 py-1">...</span>
        )
      )}

      <PageLink page={currentPage + 1} disabled={currentPage === totalPages}>
        Next
      </PageLink>
    </>
  );
}

function PageLink({
  page,
  children,
  disabled = false,
  isActive = false,
}: {
  page: number;
  children: React.ReactNode;
  disabled?: boolean;
  isActive?: boolean;
}) {
  return (
    <a
      href={`?page=${page}`}
      className={clsx(
        'px-3 py-1 border rounded',
        disabled ? 'bg-gray-300 text-gray-500 pointer-events-none' :
        isActive ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
      )}
    >
      {children}
    </a>
  );
}
