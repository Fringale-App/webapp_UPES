class Card {
  constructor({ imageUrl,foodName,price, onDismiss, onLike, onDislike }) {
    this.imageUrl = imageUrl;
    this.price = price
    this.onDismiss = onDismiss;
    this.onLike = onLike;
    this.onDislike = onDislike;
    this.name = foodName
    this.init();
  }

  init() {
    // Create the card container
    const card = document.createElement("div");
    card.classList.add(
      "card",
      "absolute",
      "w-full",
      "h-full",
      "rounded-lg",
      "overflow-hidden",
      "shadow-lg",
      "cursor-pointer",
      "bg-white"
    );

    // Create the relative container
    const relativeContainer = document.createElement("div");
    relativeContainer.classList.add(
      "relative",
      "h-[230px]",
      "bg-[#00643C]",
      "rounded-b-[50%]",
      "p-4",
      "text-center",
      
    );

    // Add food name
    const foodName = document.createElement("h2");
    foodName.classList.add("text-white", "text-2xl", "font-bold");
    foodName.textContent = this.name; // Replace with dynamic data if needed
    relativeContainer.appendChild(foodName);

    // Add price
    const foodPrice = document.createElement("p");
    foodPrice.classList.add("text-white", "text-sm");
    foodPrice.textContent = `Starting from ₹${this.price}`; // Replace with dynamic data if needed
    relativeContainer.appendChild(foodPrice);

    // Add image
    const img = document.createElement("img");
    img.src = this.imageUrl;
    img.alt = "Food Image"; // Replace with dynamic data if needed
    img.classList.add("w-60", "h-30", "mt-1", "mx-auto", "-mb-14", "rounded-lg");
    relativeContainer.appendChild(img);

    // Append the relative container to the card
    card.appendChild(relativeContainer);

    // Create the bottom section
    const bottomSection = document.createElement("div");
    bottomSection.classList.add(
      "p-4",
      "pt-12",
      "border",
      "shadow-md",
      "bg-gray-100",
      "text-gray-700"
    );

    // Add details button
    const detailsButton = document.createElement("button");
    detailsButton.classList.add(
      "px-4",
      "py-1",
      "border-2",
      "border-green-700",
      "rounded-full",
      "font-bold",
      "text-sm",
      "text-[#00643C]"
    );
    detailsButton.textContent = "Details";
    bottomSection.appendChild(detailsButton);

    // Add description
    const description = document.createElement("p");
    description.classList.add("mt-2", "text-sm");
    description.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."

    bottomSection.appendChild(description);

    // Add tags
    const tagsContainer = document.createElement("div");
    tagsContainer.classList.add("flex", "items-center", "gap-2");

    const tagsLabel = document.createElement("span");
    tagsLabel.classList.add("text-sm", "font-bold");
    tagsLabel.textContent = "Tags:";
    tagsContainer.appendChild(tagsLabel);

    const tag1 = document.createElement("span");
    tag1.classList.add("text-xs", "bg-gray-200", "px-2", "py-1", "rounded-full");
    tag1.textContent = "Cheese";
    tagsContainer.appendChild(tag1);

    const tag2 = document.createElement("span");
    tag2.classList.add("text-xs", "bg-gray-200", "px-2", "py-1", "rounded-full");
    tag2.textContent = "Burger";
    tagsContainer.appendChild(tag2);

    bottomSection.appendChild(tagsContainer);

    // Append the bottom section to the card
    card.appendChild(bottomSection);

    this.element = card;

    // Handle touch and mouse events
    if (this.isTouchDevice()) {
      this.listenToTouchEvents();
    } else {
      this.listenToMouseEvents();
    }
  }

  isTouchDevice() {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }

  listenToTouchEvents() {
    this.element.addEventListener("touchstart", (e) => {
      const touch = e.changedTouches[0];
      if (!touch) return;
      const { clientX, clientY } = touch;
      this.startPoint = { x: clientX, y: clientY };
      document.addEventListener("touchmove", this.handleTouchMove);
      this.element.style.transition = "transform 0s";
    });

    document.addEventListener("touchend", this.handleTouchEnd);
    document.addEventListener("cancel", this.handleTouchEnd);
  }

  listenToMouseEvents() {
    this.element.addEventListener("mousedown", (e) => {
      const { clientX, clientY } = e;
      this.startPoint = { x: clientX, y: clientY };
      document.addEventListener("mousemove", this.handleMouseMove);
      this.element.style.transition = "transform 0s";
    });

    document.addEventListener("mouseup", this.handleMoveUp);

    this.element.addEventListener("dragstart", (e) => {
      e.preventDefault();
    });
  }

  handleMove = (x, y) => {
    this.offsetX = x - this.startPoint.x;
    this.offsetY = y - this.startPoint.y;
    const rotate = this.offsetX * 0.1;
    this.element.style.transform = `translate(${this.offsetX}px, ${this.offsetY}px) rotate(${rotate}deg)`;

    if (Math.abs(this.offsetX) > this.element.clientWidth * 0.7) {
      this.dismiss(this.offsetX > 0 ? 1 : -1);
    }
  };

  handleMouseMove = (e) => {
    e.preventDefault();
    if (!this.startPoint) return;
    const { clientX, clientY } = e;
    this.handleMove(clientX, clientY);
  };

  handleMoveUp = () => {
    this.startPoint = null;
    document.removeEventListener("mousemove", this.handleMouseMove);
    this.element.style.transform = "";
  };

  handleTouchMove = (e) => {
    if (!this.startPoint) return;
    const touch = e.changedTouches[0];
    if (!touch) return;
    const { clientX, clientY } = touch;
    this.handleMove(clientX, clientY);
  };

  handleTouchEnd = () => {
    this.startPoint = null;
    document.removeEventListener("touchmove", this.handleTouchMove);
    this.element.style.transform = "";
  };

  dismiss = (direction) => {
    this.startPoint = null;
    document.removeEventListener("mouseup", this.handleMoveUp);
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("touchend", this.handleTouchEnd);
    document.removeEventListener("touchmove", this.handleTouchMove);
    this.element.style.transition = "transform 1s";
    this.element.style.transform = `translate(${direction * window.innerWidth}px, ${this.offsetY}px) rotate(${90 * direction}deg)`;
    this.element.classList.add("dismissing");
    setTimeout(() => {
      this.element.remove();
    }, 1000);
    if (typeof this.onDismiss === "function") {
      this.onDismiss();
    }
    if (typeof this.onLike === "function" && direction === 1) {
      this.onLike();
    }
    if (typeof this.onDislike === "function" && direction === -1) {
      this.onDislike();
    }
  };
}

export default Card;

















