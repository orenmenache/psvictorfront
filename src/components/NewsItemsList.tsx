import { EditionItem } from '../types';
import styles from './NewsItemsList.module.scss';

type NewsItemListProps = {
    newsItems: EditionItem[];
};

function NewsItemsList({ newsItems }: NewsItemListProps) {
    return (
        <div className={styles.unsortedListContainer}>
            <ul>
                {newsItems.map((newsItem) => {
                    return (
                        <li key={newsItem.data['headline']}>
                            Headline: {newsItem.data['headline']}
                            <br />
                            Description: {newsItem.data['description']}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default NewsItemsList;
