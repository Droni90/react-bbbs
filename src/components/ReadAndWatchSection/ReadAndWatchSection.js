import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';
import defineColor from '../../utils/renderColors';
import defineFigure from '../../utils/renderFigures';
import Book from '../Book/Book';
import Movie from '../Movie/Movie';
import ArticleRaW from '../ArticleRaW/ArticleRaW';
import ArticleGuide from '../ArticleGuide/ArticleGuide';

const ReadAndWatchSection = ({ sectionTitle, path, data }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 4;
  const offset = currentPage * perPage;
  const pageCount = Math.ceil(data.length / perPage);

  let currentPageData;
  switch (sectionTitle) {
    case 'Справочник':
      currentPageData = data
        .slice(offset, offset + perPage)
        .map(({ title, text, imageUrl }, i) => (
          <ArticleGuide
            title={title}
            text={text}
            imageUrl={imageUrl}
            figure={defineFigure(i)}
            size="small"
          />
        ));
      break;
    case 'Видео':
      currentPageData = data
        .slice(offset, offset + perPage)
        .map(({ title, info, imageUrl, link, id }) => (
          <Movie type="video" title={title} info={info} imageUrl={imageUrl} link={link} key={id} />
        ));
      break;
    case 'Статьи':
      currentPageData = data
        .slice(offset, offset + perPage)
        .map(({ title, author, description, id }, i) => (
          <ArticleRaW
            title={title}
            author={author}
            description={description}
            key={id}
            color={defineColor(i)}
          />
        ));
      break;
    case 'Фильмы':
      currentPageData = data
        .slice(offset, offset + perPage)
        .map(({ tags, title, info, imageUrl, link, id }) => (
          <Movie
            type="movie"
            title={title}
            info={info}
            imageUrl={imageUrl}
            link={link}
            tags={tags}
            key={id}
          />
        ));
      break;
    case 'Книги':
      currentPageData = data
        .slice(offset, offset + perPage)
        .map(({ title, author, year, description, genre, id }) => (
          <Book
            title={title}
            author={author}
            year={year}
            description={description}
            genre={genre}
            key={id}
          />
        ));
      break;
    default:
      currentPageData = [];
  }

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <section className="raw__section">
      <div className="readwatch">
        <Link className="readwatch__heading" to={path}>
          {sectionTitle}
        </Link>
        <ReactPaginate
          pageCount={pageCount}
          marginPagesDisplayed={0}
          pageRangeDisplayed={perPage}
          containerClassName="readwatch__pagination"
          previousClassName="readwatch__back"
          nextClassName="readwatch__forward"
          onPageChange={handlePageClick}
        />
      </div>
      {sectionTitle === 'Справочник' && <ul className="guide">{currentPageData}</ul>}
      {sectionTitle === 'Видео' && <ul className="movies">{currentPageData}</ul>}
      {sectionTitle === 'Статьи' && (
        <section className="events-grid events-grid_place_raw">{currentPageData}</section>
      )}
      {sectionTitle === 'Фильмы' && <ul className="movies">{currentPageData}</ul>}
      {sectionTitle === 'Книги' && <ul className="books">{currentPageData}</ul>}
    </section>
  );
};

ReadAndWatchSection.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  path: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
};

ReadAndWatchSection.defaultProps = {
  path: '',
};

export default ReadAndWatchSection;
