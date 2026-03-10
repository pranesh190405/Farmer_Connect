import listingReducer, {
  nextStep,
  prevStep,
  setStep,
  updateFormData,
  addImage,
  removeImage,
  setLocation,
  resetListing
} from "../../src/store/slices/listingSlice";

describe("listingSlice reducer", () => {

  test("should return initial state", () => {
    const state = listingReducer(undefined, { type: "unknown" });

    expect(state.currentStep).toBe(1);
    expect(state.totalSteps).toBe(5);
    expect(state.status).toBe("idle");
  });

  test("should go to next step", () => {
    const state = listingReducer(undefined, nextStep());

    expect(state.currentStep).toBe(2);
  });

  test("should go to previous step", () => {
    const startState = {
      ...listingReducer(undefined, { type: "unknown" }),
      currentStep: 3
    };

    const state = listingReducer(startState, prevStep());

    expect(state.currentStep).toBe(2);
  });

  test("should set step", () => {
    const state = listingReducer(undefined, setStep(4));

    expect(state.currentStep).toBe(4);
  });

  test("should update form data", () => {
    const state = listingReducer(undefined, updateFormData({ cropName: "Tomato" }));

    expect(state.formData.cropName).toBe("Tomato");
  });

  test("should add image", () => {
    const state = listingReducer(undefined, addImage("img1.jpg"));

    expect(state.formData.images.length).toBe(1);
  });

  test("should remove image", () => {
    const startState = {
      ...listingReducer(undefined, { type: "unknown" }),
      formData: {
        ...listingReducer(undefined, { type: "unknown" }).formData,
        images: ["img1.jpg"]
      }
    };

    const state = listingReducer(startState, removeImage(0));

    expect(state.formData.images.length).toBe(0);
  });

  test("should set location", () => {
    const location = { lat: 10, lng: 20, address: "Farm" };

    const state = listingReducer(undefined, setLocation(location));

    expect(state.formData.location.address).toBe("Farm");
  });

  test("should reset listing", () => {
    const modified = listingReducer(undefined, setStep(4));

    const state = listingReducer(modified, resetListing());

    expect(state.currentStep).toBe(1);
  });

});