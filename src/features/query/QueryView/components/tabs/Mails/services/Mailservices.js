let MOCK_MAILS = [
  {
    id: 1,
    to: "info@budgetholidaysindia.com",
    subject: "Quotation demo",
    body: "Hello, this is a sample mail",
    date: "25 March 2026",
  },
];

let idCounter = 2;

// GET
export const getMails = async ({ search = "" }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = MOCK_MAILS.filter(
        (m) =>
          m.to.toLowerCase().includes(search.toLowerCase()) ||
          m.subject.toLowerCase().includes(search.toLowerCase())
      );

      resolve({ data: filtered });
    }, 300);
  });
};

// CREATE
export const createMail = async (payload) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      MOCK_MAILS.unshift({
        id: idCounter++,
        ...payload,
        date: new Date().toDateString(),
      });
      resolve({ success: true });
    }, 300);
  });
};

// UPDATE
export const updateMail = async (id, payload) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      MOCK_MAILS = MOCK_MAILS.map((m) =>
        m.id === id ? { ...m, ...payload } : m
      );
      resolve({ success: true });
    }, 300);
  });
};

// DELETE
export const deleteMail = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      MOCK_MAILS = MOCK_MAILS.filter((m) => m.id !== id);
      resolve({ success: true });
    }, 300);
  });
};