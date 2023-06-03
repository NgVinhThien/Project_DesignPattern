function TenDiscountStrategy(originalPrice) {
    return originalPrice * 0.1;
}

function TwentyDiscountStrategy(originalPrice) {
    return originalPrice * 0.2;
}


function FiftyDiscountStrategy(originalPrice) {
    return originalPrice * 0.5;
}

function NoDiscountStrategy(originalPrice) {
    return originalPrice * 0;
}

function getPrice(originalPrice, typePromotion) {
    if (typePromotion === "10%") {
        return TenDiscountStrategy(originalPrice);
    }

    if (typePromotion === "20%") {
        return TwentyDiscountStrategy(originalPrice);
    }

    if (typePromotion === "50%") {
        return FiftyDiscountStrategy(originalPrice);
    }

    if (typePromotion === "0%") {
        return NoDiscountStrategy(originalPrice);
    }

}

export default getPrice;


