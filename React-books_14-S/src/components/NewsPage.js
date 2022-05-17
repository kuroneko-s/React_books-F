import Categories from "./Categories";
import NewsList from "./NewsList";

export default function NewsPage({ location, match, history }) {
  console.log("match - ", match);
  const category = match.params.category || "all";

  return (
    <>
      <Categories />
      <NewsList category={category} />
    </>
  );
}
