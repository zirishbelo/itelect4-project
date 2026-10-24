import useAuthStore from "../store/authStore";

function DashboardPage() {
    const userName = useAuthStore((state) => state.userName);

    return (
        <div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900
 dark:text-white">
                Dashboard
            </h2>
            <div className="max-w-xl rounded-lg border border-gray-200 bg-white p-5
 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {userName ? `Welcome back, ${userName}!` : "Welcome to RSVP Tracker"}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {userName
                        ? "Browse events and manage your RSVPs from one place."
                        : "Browse the events, then log in or register to manage your RSVPs."}
                </p>
            </div>
        </div>
    );
}
export default DashboardPage;
