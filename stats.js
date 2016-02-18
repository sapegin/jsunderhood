import stats from 'tweets-stats';
import maxValues from 'max-values';
import { merge } from 'ramda';
import getGainedFollowers from './helpers/get-gained-followers';
import getDiffFollowers from './helpers/get-diff-followers';

function getStatsPerAuthor(authors) {
  return authors
    .map(author => merge(author, { followers: author.info.followers_count }))
    .map(author => merge(author, { gainedFollowers: getGainedFollowers(author.username) }))
    .map(author => merge(author, { diffFollowers: getDiffFollowers(author.username) }))
    .map(author => merge(author, stats(author.tweets)));
}

export default function getStats(authors) {
  if (!authors || authors.length === 0) return;
  return maxValues(getStatsPerAuthor(authors), [
    'tweets', 'gainedFollowers',
    'own.total', 'replies.total', 'retweets.total',
    'favorited.total', 'favorited.average',
    'retweeted.total', 'retweeted.average',
  ]);
}
