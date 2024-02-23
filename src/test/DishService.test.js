// DishService.test.js
const DishService = require("../services/Dishes/DisheService");
const DiskStorage = require("../providers/DiskStorage");
const DishRepository = require("../repositories/Dishes/DishRepository");

jest.mock("../providers/DiskStorage");
jest.mock("../repositories/Dishes/DishRepository");

describe("DishService", () => {
  let dishService;
  let diskStorage;
  let dishRepository;

  beforeEach(() => {
    diskStorage = new DiskStorage();
    dishRepository = new DishRepository();
    dishService = new DishService();

    // Mock the return value of the create function
    dishRepository.create.mockResolvedValue({ id: 1 });
  });

  it("should create a dish", async () => {
    const dishData = {
      name: "Test Dish",
      category: "Test Category",
      price: 10,
      description: "Test Description",
      imageFileName: "test.jpg",
      ingredients: ["Test Ingredient 1", "Test Ingredient 2"]
    };

    diskStorage.saveFile.mockResolvedValue("test.jpg");

    const dish = await dishService.create(dishData);

    expect(dish).toEqual({ id: 1, ...dishData });
    expect(diskStorage.saveFile).toHaveBeenCalledWith(dishData.imageFileName);
    expect(dishRepository.create).toHaveBeenCalledWith({
      ...dishData,
      image: "test.jpg"
    });
  });
});