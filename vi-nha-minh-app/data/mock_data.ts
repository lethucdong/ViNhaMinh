// Định nghĩa cấu trúc dữ liệu để dễ quản lý hơn
type WalletType = { id: number; name: string; balance: number; is_shared: boolean; owner_id: number; };
type DebtRecordType = { id: number; user_id: number; debt_type: 'LENT' | 'BORROWED'; principal_amount: number; paid_amount: number; contact_name: string; status: 'ACTIVE' | 'COMPLETED'; };
type TransactionType = { id: number; wallet_id: number; type: 'INCOME' | 'EXPENSE' | 'DEBT_REPAYMENT'; amount: number; description: string; date: string; category: string; };
type ChartDataType = { month: string; income: number; expense: number; }; // Đơn vị: Triệu VND

export const MOCK_DATA = {
  users: [
    { id: 1, name: "An Nguyễn" },
    { id: 2, name: "Bình Trần" },
    { id: 3, name: "Cường Lê" },
  ],
  wallets: [
    { id: 101, name: "Cá Nhân (An)", balance: 5000000.00, is_shared: false, owner_id: 1 },
    { id: 103, name: "Quỹ Sinh Hoạt Chung", balance: 15000000.00, is_shared: true, owner_id: 1 },
    { id: 102, name: "Tiền Mặt (Bình)", balance: 2000000.00, is_shared: false, owner_id: 2 },
  ] as WalletType[],
  transactions: [
    { id: 501, wallet_id: 101, type: "INCOME", amount: 30000000.00, description: "Lương tháng 11", date: "2025-11-01", category: "Lương" },
    { id: 502, wallet_id: 101, type: "EXPENSE", amount: 10000000.00, description: "Thuê nhà tháng 11", date: "2025-11-05", category: "Thuê nhà" },
    { id: 504, wallet_id: 103, type: "EXPENSE", amount: 2000000.00, description: "Mua sắm siêu thị chung", date: "2025-12-02", category: "Ăn uống" },
    { id: 507, wallet_id: 101, type: "DEBT_REPAYMENT", amount: 1000000.00, description: "Hoàn trả nợ", date: "2025-12-10", category: "Vay/Trả Nợ" },
    { id: 508, wallet_id: 101, type: "INCOME", amount: 5000000.00, description: "Tiền thưởng", date: "2025-12-11", category: "Lương" },
  ] as TransactionType[],
  debt_records: [
    { id: 401, user_id: 1, debt_type: "LENT", principal_amount: 3000000.00, paid_amount: 1000000.00, contact_name: "Anh Tuấn", status: "ACTIVE" },
    { id: 402, user_id: 2, debt_type: "BORROWED", principal_amount: 5000000.00, paid_amount: 0.00, contact_name: "Chị Mai", status: "ACTIVE" },
  ] as DebtRecordType[],
  wallet_members: [
    { id: 201, wallet_id: 103, user_id: 1, role: "ADMIN" },
    { id: 202, wallet_id: 103, user_id: 2, role: "MEMBER" },
    { id: 203, wallet_id: 103, user_id: 3, role: "MEMBER" },
  ],
  // Dữ liệu biểu đồ (Đơn vị: Triệu VND) - Đây là dữ liệu bạn cần!
  chart_data: [
    { month: 'T9', income: 45, expense: 30 },
    { month: 'T10', income: 50, expense: 35 },
    { month: 'T11', income: 40, expense: 45 },
    { month: 'T12', income: 55, expense: 38 },
  ] as ChartDataType[],
};


// Hàm format tiền tệ đầy đủ (sử dụng khi cần độ chính xác cao)
export const formatFullCurrency = (amount: number, currency: string = 'VNĐ') => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
    }).format(amount);
};

// Hàm format tiền tệ gọn gàng cho biểu đồ hoặc thẻ tóm tắt (Ví dụ: 25.5 Tỷ)
export const formatCurrency = (amount: number) => {
    if (Math.abs(amount) >= 1_000_000_000) {
        // Tỷ
        const value = amount / 1_000_000_000;
        return `${value.toFixed(1)} Tỷ`;
    }
    if (Math.abs(amount) >= 1_000_000) {
        // Triệu
        const value = amount / 1_000_000;
        return `${value.toFixed(1)} Tr`;
    }
    return amount.toFixed(0);
};
// Xuất riêng MOCK_CHART_DATA (dù đã có trong MOCK_DATA) để tương thích nếu các file khác cố gắng import biến này
export const MOCK_CHART_DATA = MOCK_DATA.chart_data;