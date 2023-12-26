import { CreateFCResult, Title } from "@michijs/michijs";
import { TableManager, Table } from "../benchmark/michijs/src/index";

const PerformanceTests: CreateFCResult = () => (
  <>
    <Title>Performance tests Page</Title>
    <TableManager />
    <Table />
  </>
);

export default PerformanceTests;
