const BACKEND_ROUTE = `${import.meta.env.VITE_BACKEND_ROUTE}/`;

export async function checkForDuplicate(
  itemName: string,
  token: string,
  excludedItemId = null,
) {
  const url = `${BACKEND_ROUTE}duplicateNames/${itemName}`; // Encode item name for safety

  const queryParams = excludedItemId ? `?excludedItemId=${excludedItemId}` : "";

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    // Handle error based on response.status
    throw new Error("Duplicate check failed");
  }

  const data = await response.json();
  return data.isDuplicate;
}

export const useCheckDuplicate = (
  value: string,
  token: string,
  excludedItemId = null,
) => {
  try {
    const response = checkForDuplicate(value, token!);
    return !response; // Return true if item name doesn't exist
  } catch (error) {
    console.error("Error checking item name existence:", error);
    return false; // Return false to indicate validation failure
  }
};
