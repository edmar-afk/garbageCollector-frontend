import React from "react";

function StaffsTable() {
  return (
    <>
      <div class="w-full flex items-center justify-center min-h-full p-2">
        <div class="container">
          <div class="bg-white rounded-xl shadow-md overflow-hidden">
            <div class="p-6 border-b border-gray-200">
              <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 class="text-xl font-bold text-gray-800">Staff Members</h2>
                  <p class="text-gray-500 mt-1">
                    Manage your team staff and their account permissions here.
                  </p>
                </div>
              </div>

              <div class="mt-6 flex flex-col sm:flex-row gap-4">
                <div class="relative flex-grow">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      class="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full "
                    placeholder="Search Staffs..."
                  />
                </div>
                <div>
                  <select class="border border-gray-300 rounded-lg px-4 py-2  w-full sm:w-auto">
                    <option value="">Admin</option>
                    <option value="engineering">Other</option>
                    <option value="design">Other</option>
                    <option value="marketing">Other</option>
                    <option value="sales">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Role
                    </th>

                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr class="hover:bg-gray-50 transition-colors duration-150">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="h-10 w-10 flex-shrink-0">
                          <img
                            class="h-10 w-10 rounded-full object-cover"
                            src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
                            alt=""
                          />
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            Edmar Jay Heolin
                          </div>
                          <div class="text-sm text-gray-500">
                            jaywrsnp6@gmail.com
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">Admin</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a
                        href="#"
                        class="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        Edit
                      </a>
                      <a href="#" class="text-red-600 hover:text-red-900">
                        Delete
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
              <div class="flex items-center justify-between flex-col sm:flex-row">
                <div class="mb-4 sm:mb-0">
                  <p class="text-sm text-gray-700">
                    Showing
                    <span class="font-medium"> 1</span> results
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StaffsTable;
