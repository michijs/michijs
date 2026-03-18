import { type CreateFCResult, Title } from "@michijs/michijs";
import { TableManager, TableBody } from "../benchmark/michijs/src/index";

const PerformanceTests: CreateFCResult = () => (
  <>
    <Title>Performance tests Page</Title>
    {/* @ts-ignore */}
    <TableManager />
    <table>
      {/* @ts-ignore */}
      <TableBody />
    </table>
  </>
);

export default PerformanceTests;
