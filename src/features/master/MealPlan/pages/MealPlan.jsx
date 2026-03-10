import React, { useState, useMemo, useEffect } from "react";
import { Pencil } from "lucide-react";
import MealPlanModal from "../components/MealPlanModal";
import { useAuth } from "@/core/auth/AuthProvider";
import {
  getMealPlans,
  createMealPlan,
  updateMealPlan
} from "../services/MealPlanService";

import "./MealPlan.css";

const MealPlan = () => {

  const { user } = useAuth();

  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    status: "Active",
  });

  /* FETCH */

  const fetchMealPlans = async (userId) => {

    if (!userId) return;

    try {

      setLoading(true);

      const res = await getMealPlans(userId);

      const formatted = res.data.map((item) => ({
        id: item.id,
        name: item.name,
        status: item.status === 1 ? "Active" : "Inactive",
        by: item.addedBy ?? "-",
        date: item.dateAdded
          ? new Date(item.dateAdded).toLocaleDateString()
          : "-"
      }));

      setData(formatted);

    } catch (error) {

      console.error("Error fetching meal plans:", error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    if (!user?.id) return;
    fetchMealPlans(user.id);

  }, [user]);

  /* ADD */

  const handleAdd = () => {

    setIsEdit(false);
    setFormData({ name: "", status: "Active" });
    setModalOpen(true);

  };

  /* EDIT */

  const handleEdit = (item) => {

    setIsEdit(true);
     setFormData({
      id: item.id,
       name: item.name,
        status: item.status
    });

    setModalOpen(true);

  };

  /* SAVE */

  const handleSave = async () => {

    if (!formData.name.trim()) return;

    const userId = user?.id;
    if (!userId) return;

    try {

      if (!isEdit) {

        await createMealPlan({
          name: formData.name,
          status: formData.status === "Active" ? 1 : 0,
          user_id: userId
        });

      } else {

        await updateMealPlan(formData.id, {
          name: formData.name,
          status: formData.status === "Active" ? 1 : 0
        });

      }

      fetchMealPlans(userId);
      setModalOpen(false);

    } catch (error) {

      console.error("Save meal plan error:", error);

    }

  };

  /* SEARCH */

  const filteredData = useMemo(() => {

    return data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

  }, [search, data]);

  /* PAGINATION */

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const startIndex = (page - 1) * pageSize;

  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + pageSize
  );

  return (
    <>
      <div className="meal-wrapper">

        <div className="meal-card">

          {/* HEADER */}

          <div className="meal-header">

            <div className="meal-title">

              <h4>Meal Plan</h4>
              <span>Manage your meal plans</span>

            </div>

            <div className="meal-actions">

              <input
                className="meal-search"
                placeholder="Search meal plan..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button className="meal-add-btn" onClick={handleAdd}>
                + Add Meal Plan
              </button>

            </div>

          </div>

          {/* TABLE */}

          <div className="meal-table-wrapper">

            <table className="meal-table">

              <thead>

                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Added By</th>
                  <th>Date</th>
                  <th width="80">Edit</th>
                </tr>

              </thead>

              <tbody>

                {loading ? (

                  <tr>
                    <td colSpan="5" className="empty-row">
                      Loading...
                    </td>
                  </tr>

                ) : paginatedData.length === 0 ? (

                  <tr>
                    <td colSpan="5" className="empty-row">
                      No meal plans found
                    </td>
                  </tr>

                ) : (

                  paginatedData.map((item) => (

                    <tr key={item.id}>

                      <td>{item.name}</td>

                      <td>

                        <span
                          className={
                            item.status === "Active"
                              ? "badge-active"
                              : "badge-inactive"
                          }
                        >
                          {item.status}
                        </span>

                      </td>

                      <td>{item.by}</td>

                      <td>{item.date}</td>

                      <td>

                        <button
                          className="meal-edit-btn"
                          onClick={() => handleEdit(item)}
                        >
                          <Pencil size={14}/>
                        </button>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

          {/* PAGINATION */}

          {totalPages > 1 && (

            <div className="meal-pagination">

              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Prev
              </button>

              <span>
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </button>

            </div>

          )}

        </div>

      </div>

      <MealPlanModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        formData={formData}
        setFormData={setFormData}
        isEdit={isEdit}
      />
    </>
  );

};

export default MealPlan;