"use client";
import { useEffect, useState } from "react";
import { Trash2, Edit2, Plus, Search } from "lucide-react";

interface Product {
  _id?: string;
  name: string;
  desc: string;
  price: number;
  image: string;
  unit: string;
  discount: number;
}

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [unit, setUnit] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  // Popup
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  };

  const deleteProduct = async (id: string | undefined) => {
    if (!confirm("Bạn chắc chắn muốn xóa?")) return;

    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    });

    loadProducts();
  };

  const saveProduct = async (e: any) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const newProduct = {
      name: form.get("name"),
      desc: form.get("desc"),
      price: Number(form.get("price")),
      image: form.get("image"),
      unit: form.get("unit"),
      discount: Number(form.get("discount")),
    };

    if (editing?._id) {
      await fetch(`http://localhost:5000/api/products/${editing._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
    } else {
      await fetch(`http://localhost:5000/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
    }

    setShowForm(false);
    setEditing(null);
    loadProducts();
  };

  // Lọc sản phẩm
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (unit ? p.unit === unit : true)
  );

  const start = (currentPage - 1) * productsPerPage;
  const currentProducts = filtered.slice(start, start + productsPerPage);

  return (
    <div className="ml-64 mt-16 p-6">
      <h2 className="text-2xl font-bold mb-4">Danh sách sản phẩm</h2>

      {/* Tìm kiếm + lọc + thêm */}
      <div className="flex flex-wrap gap-4 mb-5">
        <div className="flex items-center border px-3 py-2 rounded-lg w-72">
          <Search size={16} />
          <input
            className="ml-2 w-full outline-none"
            placeholder="Tìm sản phẩm..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="border px-3 py-2 rounded-lg"
          onChange={(e) => setUnit(e.target.value)}
        >
          <option value="">Lọc theo đơn vị</option>
          <option value="Vỉ">Vỉ</option>
          <option value="Hộp">Hộp</option>
          <option value="Viên">Viên</option>
          <option value="Lọ">Lọ</option>
        </select>

        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} /> Thêm sản phẩm
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full border-collapse bg-white shadow rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-sm">
            <th className="border p-2">Ảnh</th>
            <th className="border p-2">Tên</th>
            <th className="border p-2">Mô tả</th>
            <th className="border p-2">Giá</th>
            <th className="border p-2">Giảm giá</th>
            <th className="border p-2">Đơn vị</th>
            <th className="border p-2">Sửa</th>
            <th className="border p-2">Xóa</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((p) => (
            <tr key={p._id} className="hover:bg-gray-50">
              <td className="border p-2 text-center">
                <img className="w-14 h-14 rounded object-cover mx-auto" src={p.image} />
              </td>
              <td className="border p-2 font-semibold">{p.name}</td>
              <td className="border p-2 text-sm max-w-xs">{p.desc}</td>
              <td className="border p-2 text-blue-600 font-semibold">
                {p.price.toLocaleString()}₫
              </td>
              <td className="border p-2 text-center">
                {p.discount}% <br />
                <span className="text-green-600 text-sm">
                  Giá còn: {(p.price * (1 - p.discount / 100)).toLocaleString()}₫
                </span>
              </td>
              <td className="border p-2 text-center">{p.unit}</td>

              <td className="border p-2 text-center">
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => {
                    setEditing(p);
                    setShowForm(true);
                  }}
                >
                  <Edit2 size={18} />
                </button>
              </td>

              <td className="border p-2 text-center">
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => deleteProduct(p._id!)}
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phân trang */}
      <div className="flex items-center gap-3 mt-4">
        <button
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          ◀
        </button>

        <span>
          Trang {currentPage} / {Math.ceil(filtered.length / productsPerPage)}
        </span>

        <button
          disabled={start + productsPerPage >= filtered.length}
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          ▶
        </button>
      </div>

      {/* POPUP */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <form
            onSubmit={saveProduct}
            className="bg-white p-6 w-96 shadow rounded-lg space-y-3"
          >
            <h2 className="text-xl font-bold">
              {editing ? "Sửa sản phẩm" : "Thêm sản phẩm"}
            </h2>

            <input
              name="name"
              defaultValue={editing?.name}
              className="border p-2 w-full rounded"
              placeholder="Tên sản phẩm"
              required
            />
            <input
              name="desc"
              defaultValue={editing?.desc}
              className="border p-2 w-full rounded"
              placeholder="Mô tả"
              required
            />
            <input
              name="price"
              defaultValue={editing?.price}
              type="number"
              className="border p-2 w-full rounded"
              placeholder="Giá"
              required
            />
            <input
              name="discount"
              defaultValue={editing?.discount}
              type="number"
              className="border p-2 w-full rounded"
              placeholder="Giảm giá (%)"
              required
            />
            <input
              name="image"
              defaultValue={editing?.image}
              className="border p-2 w-full rounded"
              placeholder="Link ảnh"
              required
            />

            <select
              name="unit"
              defaultValue={editing?.unit}
              className="border p-2 w-full rounded"
              required
            >
              <option value="Vỉ">Vỉ</option>
              <option value="Hộp">Hộp</option>
              <option value="Viên">Viên</option>
              <option value="Lọ">Lọ</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border rounded"
              >
                Hủy
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded">
                Lưu
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
