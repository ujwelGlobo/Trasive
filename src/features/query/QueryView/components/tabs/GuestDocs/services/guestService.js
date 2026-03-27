let MOCK_DB = [
  {
    id: 1,
    first_name: "David",
    last_name: "Thomas",
    gender: "MALE",
    dob: "2026-03-25",
  },
];

let idCounter = 2;

// GET
export const getGuests = async ({ page = 1, search = "" }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = MOCK_DB.filter((g) =>
        `${g.first_name} ${g.last_name}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );

      const perPage = 5;
      const start = (page - 1) * perPage;

      resolve({
        data: filtered.slice(start, start + perPage),
        last_page: Math.ceil(filtered.length / perPage) || 1,
      });
    }, 300);
  });
};

// CREATE
export const createGuest = async (payload) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      MOCK_DB.unshift({
        id: idCounter++,
        ...payload,
      });
      resolve({ success: true });
    }, 300);
  });
};

// UPDATE
export const updateGuest = async (id, payload) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      MOCK_DB = MOCK_DB.map((item) =>
        item.id === id ? { ...item, ...payload } : item
      );
      resolve({ success: true });
    }, 300);
  });
};

// DELETE
export const deleteGuest = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      MOCK_DB = MOCK_DB.filter((item) => item.id !== id);
      resolve({ success: true });
    }, 300);
  });
};