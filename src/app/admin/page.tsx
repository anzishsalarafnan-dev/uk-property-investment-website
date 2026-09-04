import { supabaseAdmin } from "@/lib/database/client";

export default async function AdminLeadsPage() {
  const { data: leads, error } = await supabaseAdmin()
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
      <p className="mt-1 text-sm text-slate-600">
        {leads ? `${leads.length} most recent leads` : "Unable to load leads"}
      </p>

      {error && (
        <p className="mt-4 rounded-md bg-red-50 p-4 text-sm text-red-700">{error.message}</p>
      )}

      <div className="mt-6 overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-4 py-3 font-semibold text-slate-700">Name</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Email</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Source</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Score</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Message</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Date</th>
            </tr>
          </thead>
          <tbody>
            {leads?.map((lead) => (
              <tr key={lead.id} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3 font-medium text-slate-900">{lead.name}</td>
                <td className="px-4 py-3 text-slate-600">{lead.email}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                    {lead.source}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-600">{lead.score}</td>
                <td className="px-4 py-3 max-w-xs truncate text-slate-600">{lead.message}</td>
                <td className="px-4 py-3 whitespace-nowrap text-slate-500">
                  {new Date(lead.created_at).toLocaleString("en-GB")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {leads?.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-slate-500">No leads yet.</p>
        )}
      </div>
    </div>
  );
}
