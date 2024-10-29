let order = [];

function selectItem(name, price) {
    order.push({ name, price });
    updateOrderList();
}

function updateOrderList() {
    const orderList = document.getElementById("order-list");
    orderList.innerHTML = ""; // Clear the list
    order.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - ${item.price}`;
        orderList.appendChild(li);
    });
}

function sendOrder() {
    const token = "7899457041:AAHxvSXGMau9I8RJvqlK7OjIQDUB7xROFpM"; // Replace with your bot's API token
    const chatId = "-1002352205073"; // Replace with your actual chat ID
    const message = order.map(item => `${item.name} - ${item.price}`).join("\n");
    
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    fetch(url)
        .then(response => {
            if (response.ok) {
                alert("Order sent to Telegram!");
                order = []; // Clear order after sending
                updateOrderList(); // Update the order list
            } else {
                alert("Failed to send order.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while sending the order.");
        });
}
