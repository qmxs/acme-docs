import handleZodError from "./handle-zod-error";
import { z } from "zod";
import { describe, it, expect } from "vitest";

describe("handleZodError", () => {
  it("should return isError true", () => {
    const result = handleZodError({
      schema: z.string(),
      data: 123,
    });
    expect(result.isError).toBe(true);
  });

  it("should return isError false", () => {
    const result = handleZodError({
      schema: z.string(),
      data: "123",
    });
    expect(result.isError).toBe(false);
  });

  it("should return isError true with message", () => {
    const result = handleZodError({
      schema: z.string(),
      data: 123,
      prefixErrorMessage: "Error: ",
    });
    expect(result.isError).toBe(true);
    expect(result.message).toBe("Error: Expected string, received number");
  });

  it("should return isError true with multiple issues", () => {
    const result = handleZodError({
      schema: z.object({
        name: z.string(),
        age: z.number(),
      }),
      data: {
        name: 123,
        age: "123",
      },
      prefixErrorMessage: "Error: ",
    });
    expect(result.isError).toBe(true);
    expect(result.message).toBe(
      "Error: Expected string, received number, Expected number, received string"
    );
  });
});
