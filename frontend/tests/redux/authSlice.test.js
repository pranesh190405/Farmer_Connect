import authReducer, {
  clearError,
  logout,
  sessionExpired,
  setLoading,
  resetAuthFlow
} from "../../src/store/slices/authSlice";

describe("authSlice reducer", () => {

  test("should return initial state", () => {
    const state = authReducer(undefined, { type: "unknown" });

    expect(state).toEqual({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      mobileNumber: "",
      error: null,
      userType: null,
      admin: null
    });
  });

  test("should clear error", () => {
    const previousState = {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      mobileNumber: "",
      error: "Some error",
      userType: null,
      admin: null
    };

    const state = authReducer(previousState, clearError());

    expect(state.error).toBe(null);
  });

  test("should set loading", () => {
    const state = authReducer(undefined, setLoading(true));

    expect(state.isLoading).toBe(true);
  });

  test("should logout user", () => {
    const loggedState = {
      user: { mobile: "9999999999" },
      isAuthenticated: true,
      isLoading: false,
      mobileNumber: "9999999999",
      error: null,
      userType: "farmer",
      admin: null
    };

    const state = authReducer(loggedState, logout());

    expect(state.user).toBe(null);
    expect(state.isAuthenticated).toBe(false);
    expect(state.userType).toBe(null);
  });

  test("should handle sessionExpired", () => {
    const loggedState = {
      user: { mobile: "9999999999" },
      isAuthenticated: true,
      isLoading: false,
      mobileNumber: "9999999999",
      error: null,
      userType: "farmer",
      admin: null
    };

    const state = authReducer(loggedState, sessionExpired());

    expect(state.user).toBe(null);
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBe("Session expired. Please login again.");
  });

  test("should reset auth flow", () => {
    const previousState = {
      user: null,
      isAuthenticated: false,
      isLoading: true,
      mobileNumber: "9999999999",
      error: "Error",
      userType: null,
      admin: null
    };

    const state = authReducer(previousState, resetAuthFlow());

    expect(state.mobileNumber).toBe("");
    expect(state.error).toBe(null);
    expect(state.isLoading).toBe(false);
  });

});