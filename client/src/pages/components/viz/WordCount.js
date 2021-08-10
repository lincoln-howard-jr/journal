import { useEffect, useReducer, useState } from 'react';
import {useApp} from '../../../AppProvider'
import SearchIcon from '../../../img/search.svg';
import { dateFromShortHand, dateShortHand } from '../../../lib/indexing';
import {width, height, padding, marginTop, oneDay} from './dimensions';

// 
function keywordReducer (state, _keyword) {
  let keyword = _keyword.toLowerCase ();
  if (state.includes (keyword)) return state.filter (word => word !== keyword);
  if (state.length < 4) return [...state, keyword];
  return state;
}

export default function WordCount () {
  
  // get necessary global state
  const {journal: {entries}} = useApp ();
  
  // necessary state
  const [idx, setIdx] = useState ([]);
  const [keywords, toggleKeyword] = useReducer (keywordReducer, []);
  const [wordCounts, setWordCounts] = useState ([]);
  const [domain_0, setDomain0] = useState (new Date ());
  const [domain_n, setDomainN] = useState (new Date ());
  const [range_n, setRangeN] = useState (1);
  
  // get {x|y} coordinate [0,1]
  // const xscale = date => (date.getTime () - domain_0.getTime ()) / (domain_n.getTime () - domain_0.getTime ());
  const xinverse = scale => {
    let offset = scale * (domain_n.getTime () - domain_0.getTime ());
    offset = offset - (offset % oneDay);
    return new Date (domain_0.getTime () + offset);
  }
  const yscale = count => count / range_n;

  // calculate the word cont index and domain
  useEffect (() => {
    if (entries.length === 0) return;
    let list = entries.map (obj => Object.assign (obj, {date: dateFromShortHand (obj.date)}))
    list = list.sort ((a, b) => a.date - b.date);
    list = list.map (idx => {
      let text = idx.list.map (entry => (entry.entryType === 'questions' | !entry.entryType) ? entry.answers.join (' ') : entry.entryType === 'freeform' ? entry.freeform : '').join (' ').toLowerCase ()
      return Object.assign (idx, {text});
    });
    setIdx (list);
    setDomain0 (list [0].date);
    setDomainN (list [list.length - 1].date);
  }, [entries]);

  // generate word counts to show based on keywords
  useEffect (() => {
    let domain = Math.floor ((domain_n.getTime () - domain_0.getTime ()) / oneDay);
    let wcl = keywords.map (() => new Array (domain).fill (0));
    let placeholder = 0;
    for (let i = 0; i < domain; i++) {
      let day = new Date (domain_0.getTime () + i * oneDay);
      if (day < idx [placeholder].date) continue;
      for (let j = 0; j < wcl.length; j++)
        wcl [j][i] = idx [placeholder].text.split (keywords [j]).length - 1;
      placeholder++;
    }
    let rn = Math.max (...wcl.flat ());
    if (rn < 1) rn = 1;
    setRangeN (rn);
    setWordCounts (wcl);
  }, [keywords]);

  // event handlers
  const addKeyword = e => {
    e.preventDefault ();
    toggleKeyword (e.target.elements.keyword.value)
    e.target.elements.keyword.value = '';
  }

  return ((
      <figure className="keywords">
        <figcaption>Keyword Search</figcaption>
        <section className="keyword-container">
          <form onSubmit={addKeyword} className="keyword-search">
            <input name="keyword" placeholder="keyword" autoComplete="off" />
            <label><input type="submit" hidden /> <img src={SearchIcon} /></label>
          </form>
        </section>
        <svg className="keyword-chart" viewBox={`0 0 ${width} ${height}`} key='keyword-chart'>
          <g className="keyword-chart-axis">
            {/* axis & labels */}
            <line x1={padding} x2={width - padding} y1={height - padding} y2={height - padding} />
            <line x1={padding} x2={padding} y1={height - padding} y2={padding + marginTop} />
            <text x={padding / 2} y={height - padding} textAnchor="middle">0</text>
            <text x={padding / 2} y={marginTop + padding} textAnchor="middle">{range_n}</text>
            <text x={padding * 2.5} y={height - padding / 4} textAnchor="middle">{dateShortHand (domain_0)}</text>
            <text x={width - padding * 2.5} y={height - padding / 4} textAnchor="middle">{dateShortHand (domain_n)}</text>
            {/* labels */}
            <g className="keyword-chart-labels">
              {
                keywords.map ((word, i) => (
                  <text textAnchor="middle" x={padding + ((i + 0.5) * width / 4)} y={marginTop} onClick={() => toggleKeyword (word)}>{word}</text>
                ))
              }
            </g>
          </g>
          {
            wordCounts.map ((list, i) => (
              <g className={`keyword-trendline-${i + 1}`} key={`keyword-trendline-${keywords [i]}`}>
                {
                  list.map ((count, i) => i === list.length - 1 ? null :
                    <line
                      x1={padding + i * (width - padding * 2) / list.length}
                      x2={padding + (i + 1) * (width - padding * 2) / list.length}
                      y1={(height - padding) - yscale (count) * (height - marginTop - padding * 2)}
                      y2={(height - padding) - yscale (list [i + 1]) * (height - marginTop - padding * 2)}
                    />
                  )
                }
              </g>
            ))
          }
        </svg>
      </figure>
  ))
}