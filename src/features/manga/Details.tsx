import { Manga } from "../../utils/interfaces";

export default function Details({ manga }: { manga?: Manga }): JSX.Element {
  return (
    <table className="mt-4 w-full rounded-2xl bg-rose-200 md:mt-8">
      <tbody>
        <tr>
          <td className="px-8 py-2 pt-8">Publisher</td>
          <td className="px-8 py-2 pt-8">{manga?.Publisher}</td>
        </tr>
        <tr>
          <td className="px-8 py-2">Author</td>
          <td className="px-8 py-2">{manga?.Author}</td>
        </tr>
        <tr>
          <td className="px-8 py-2">Amount of pages</td>
          <td className="px-8 py-2">{manga?.NumberOfPages}</td>
        </tr>
        <tr>
          <td className="px-8 py-2">Serie size</td>
          <td className="px-8 py-2">{manga?.SerieSize}</td>
        </tr>
        <tr>
          <td className="px-8 py-2">Genres</td>
          <td className="px-8 py-2">
            {manga?.Genres.map((genre) => genre.Title).join(", ")}
          </td>
        </tr>
        <tr>
          <td className="px-8 py-2 pb-8">Age limit</td>
          <td className="px-8 py-2 pb-8">{manga?.AgeLimit}+</td>
        </tr>
      </tbody>
    </table>
  );
}
