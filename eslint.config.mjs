import { defineConfig, globalIgnores } from "eslint/config"
import { tanstackConfig } from "@tanstack/eslint-config"

const eslintConfig = defineConfig([
  ...tanstackConfig,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",
    "convex/_generated/**",
    "next-env.d.ts",
  ]),
])

export default eslintConfig
