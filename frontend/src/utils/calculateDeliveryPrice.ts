export const calculateDeliveryPrice = (selectedDeliveryMethod: string, totalPrice: number): number => {
    let price = 0;
  
    switch (selectedDeliveryMethod) {
      case "Самовивіз з відділення Укрпошти":
        price = 50;
        break;
      case "Самовивіз з відділення Нової Пошти":
      case "Самовивіз з поштомату Нової Пошти":
        price = 60;
        break;
      case "Доставка кур’єром Нової Пошти":
        price = 70;
        break;
      default:
        price = 0;
    }
  
    if (totalPrice >= 500) {
      price = 0;
    }
  
    return price;
  };
  