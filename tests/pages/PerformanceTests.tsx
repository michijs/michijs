import { FC, Title } from "../../src";
import { TableManager, Table } from "../benchmark/michijs/src/index";

const PerformanceTests: FC = () => (
  <>
    <Title>Performance tests Page</Title>
    <TableManager />
    <Table />
  </>
)

export default PerformanceTests;
