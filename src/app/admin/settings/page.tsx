import { getAllSettings } from "@/lib/database/content";
import SettingsForm from "@/components/admin/SettingsForm";

export default async function AdminSettingsPage() {
  const settings = await getAllSettings();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Site Settings</h1>
      <p className="mt-1 text-sm text-slate-600">Contact details shown across the site.</p>
      <div className="mt-6 max-w-lg">
        <SettingsForm settings={settings} />
      </div>
    </div>
  );
}
