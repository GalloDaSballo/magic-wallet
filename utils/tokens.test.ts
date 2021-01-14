import { fetchTokens } from "./tokens";

// See Token List schema: https://uniswap.org/tokenlist.schema.json
describe("fetchTokens", () => {
    it("Fetches proper schema", async () => {
        const tokens = await fetchTokens();

        expect(tokens.length).toBeGreaterThan(0);

        tokens.forEach((token) => {
            expect(token).toHaveProperty("name");
            expect(token).toHaveProperty("symbol");
            expect(token).toHaveProperty("decimals");
            expect(token).toHaveProperty("logoURI");
            expect(token).toHaveProperty("address");
        });
    });
});
