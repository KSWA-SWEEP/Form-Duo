const axios = require("axios");
const svyService = require("./svyService");

jest.mock("axios");

test("findOne fetches data from the API endpoint and returns what axios get returns", async () => {
  axios.get.mockResolvedValue({
    data: {
      id: 1,
      question: "오늘의 아침 메뉴는?",
    },
  });

  const svy = await svyService.findOne(1);

  expect(svy).toHaveProperty("id", 1);
  expect(svy).toHaveProperty("question", "오늘의 아침 메뉴는?");
  expect(axios.get).toBeCalledTimes(1);
  expect(axios.get).toBeCalledWith(
    `https://formduo.ddns.net/survey/share/1`
  );
});
