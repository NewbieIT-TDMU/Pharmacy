const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fetch = require("node-fetch");
const productRouter = require("./routes/productRouter");
const CartRouter = require("./routes/cartRouter");
const userRouter = require("./routes/userRouter");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Kết nối MongoDB thành công"))
.catch((err) => console.error("Lỗi kết nối MongoDB:", err));

app.use("/api/products", productRouter);
app.use("/api/carts", CartRouter);
app.use("/api/users", userRouter);

app.get("/api/provinces", async (req, res) => {
  try {
    const response = await fetch("https://provinces.open-api.vn/api/?depth=3");
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Lỗi khi lấy dữ liệu:", err);
    res.status(500).json({ error: "Không thể tải dữ liệu địa chỉ" });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server chạy tại http://localhost:${PORT}`));
