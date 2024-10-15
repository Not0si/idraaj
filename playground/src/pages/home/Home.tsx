import CodeBlock from '@components/codeblock/CodeBlock'

import { useState } from 'react'

import { NumericField } from '../../../../src'
import Section from './Section'
import styles from './styles.module.css'

type example = { htmlContent: string; text: string }
const examples: { [key: string]: example } = {
  installation: {
    htmlContent: `<code><span class="line"><span style="color:#4C4F69">npm install idraaj</span></span></code>`,
    text: 'npm install idraaj',
  },
  usage: {
    htmlContent: `<code><span class="line"><span style="color:#8839EF">import</span><span style="color:#7C7F93"> {</span><span style="color:#4C4F69"> NumericField </span><span style="color:#7C7F93">}</span><span style="color:#8839EF"> from</span><span style="color:#40A02B"> 'idraaj'</span></span>
<span class="line"><span style="color:#8839EF">import</span><span style="color:#7C7F93"> {</span><span style="color:#4C4F69"> Fragment </span><span style="color:#7C7F93">}</span><span style="color:#8839EF"> from</span><span style="color:#40A02B"> 'react'</span></span>
<span class="line"></span>
<span class="line"><span style="color:#8839EF">function</span><span style="color:#1E66F5;font-style:italic"> Component</span><span style="color:#7C7F93">()</span><span style="color:#7C7F93"> {</span></span>
<span class="line"><span style="color:#8839EF">  return</span><span style="color:#4C4F69"> (</span><span style="color:#04A5E5">&lt;</span><span style="color:#DF8E1D;font-style:italic">Fragment</span><span style="color:#04A5E5">&gt;</span></span>
<span class="line"><span style="color:#04A5E5">              &lt;</span><span style="color:#DF8E1D;font-style:italic">NumericField placeholder</span><span style="color:#179299">=</span><span style="color:#40A02B">"</span><span style="color:#40A02B;font-style:italic">Idraaj Numeric Field</span><span style="color:#40A02B">"</span><span style="color:#DF8E1D;font-style:italic"> /</span><span style="color:#04A5E5">&gt;</span></span>
<span class="line"><span style="color:#04A5E5">              &lt;</span><span style="color:#DF8E1D;font-style:italic">input type</span><span style="color:#179299">=</span><span style="color:#40A02B">"</span><span style="color:#40A02B;font-style:italic">number</span><span style="color:#40A02B">"</span><span style="color:#DF8E1D;font-style:italic"> placeholder</span><span style="color:#179299">=</span><span style="color:#40A02B">"</span><span style="color:#40A02B;font-style:italic">Regular HTML Number Input</span><span style="color:#40A02B">"</span><span style="color:#DF8E1D;font-style:italic"> /</span><span style="color:#04A5E5">&gt;</span></span>
<span class="line"><span style="color:#04A5E5">         &lt;</span><span style="color:#DF8E1D;font-style:italic">/Fragment</span><span style="color:#04A5E5">&gt;</span></span>
<span class="line"><span style="color:#4C4F69">  )</span></span>
<span class="line"><span style="color:#4C4F69">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#4C4F69">export default Component</span></span>
<span class="line"></span>
<span class="line"></span></code>`,
    text: `import { NumericField } from 'idraaj'
import { Fragment } from 'react'

function Component() {
  return (<Fragment>
              <NumericField placeholder="Idraaj Numeric Field" />
              <input type="number" placeholder="Regular HTML Number Input" />
         </Fragment>
  )
}

export default Component`,
  },
  default: {
    htmlContent: `<code><span class="line"><span style="color:#8839EF">import</span><span style="color:#7C7F93"> {</span><span style="color:#4C4F69"> NumericField </span><span style="color:#7C7F93">}</span><span style="color:#8839EF"> from</span><span style="color:#40A02B"> 'idraaj'</span></span>
<span class="line"><span style="color:#8839EF">import</span><span style="color:#7C7F93"> {</span><span style="color:#4C4F69"> Fragment</span><span style="color:#7C7F93">,</span><span style="color:#4C4F69"> useState </span><span style="color:#7C7F93">}</span><span style="color:#8839EF"> from</span><span style="color:#40A02B"> 'react'</span></span>
<span class="line"></span>
<span class="line"><span style="color:#8839EF">function</span><span style="color:#1E66F5;font-style:italic"> Component</span><span style="color:#7C7F93">()</span><span style="color:#7C7F93"> {</span></span>
<span class="line"><span style="color:#8839EF">  const</span><span style="color:#7C7F93"> [</span><span style="color:#4C4F69">value</span><span style="color:#7C7F93">,</span><span style="color:#4C4F69"> setValue</span><span style="color:#7C7F93">]</span><span style="color:#179299"> =</span><span style="color:#1E66F5;font-style:italic"> useState</span><span style="color:#04A5E5">&lt;</span><span style="color:#8839EF">number</span><span style="color:#179299"> |</span><span style="color:#8839EF;font-style:italic"> null</span><span style="color:#04A5E5">&gt;</span><span style="color:#4C4F69">(</span><span style="color:#FE640B">1234</span><span style="color:#4C4F69">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#8839EF">  return</span><span style="color:#4C4F69"> (</span><span style="color:#04A5E5">&lt;</span><span style="color:#DF8E1D;font-style:italic">Fragment</span><span style="color:#04A5E5">&gt;</span></span>
<span class="line"><span style="color:#04A5E5">              &lt;</span><span style="color:#DF8E1D;font-style:italic">NumericField </span></span>
<span class="line"><span style="color:#DF8E1D;font-style:italic">                  type</span><span style="color:#179299">=</span><span style="color:#40A02B">"</span><span style="color:#40A02B;font-style:italic">integer</span><span style="color:#40A02B">"</span></span>
<span class="line"><span style="color:#DF8E1D;font-style:italic">                  value</span><span style="color:#179299">=</span><span style="color:#7C7F93">{</span><span style="color:#4C4F69;font-style:italic">value</span><span style="color:#7C7F93">}</span></span>
<span class="line"><span style="color:#DF8E1D;font-style:italic">                  onChange</span><span style="color:#179299">=</span><span style="color:#7C7F93">{(</span><span style="color:#E64553;font-style:italic">value</span><span style="color:#7C7F93">)</span><span style="color:#179299"> =&gt;</span><span style="color:#7C7F93"> {</span></span>
<span class="line"><span style="color:#1E66F5;font-style:italic">                      setValue</span><span style="color:#7C7F93">(</span><span style="color:#E64553;font-style:italic">value</span><span style="color:#7C7F93">)</span></span>
<span class="line"><span style="color:#7C7F93">                  }}</span><span style="color:#DF8E1D;font-style:italic"> </span></span>
<span class="line"><span style="color:#DF8E1D;font-style:italic">                  placeholder</span><span style="color:#179299">=</span><span style="color:#40A02B">"</span><span style="color:#40A02B;font-style:italic">Insert Number</span><span style="color:#40A02B">"</span><span style="color:#DF8E1D;font-style:italic"> /</span><span style="color:#04A5E5">&gt;</span><span style="color:#4C4F69"> </span></span>
<span class="line"><span style="color:#04A5E5">         &lt;</span><span style="color:#DF8E1D;font-style:italic">/Fragment</span><span style="color:#04A5E5">&gt;</span></span>
<span class="line"><span style="color:#4C4F69">  )</span></span>
<span class="line"><span style="color:#4C4F69">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#4C4F69">export default Component</span></span>
<span class="line"></span>
<span class="line"></span></code>`,
    text: `import { NumericField } from 'idraaj'
import { Fragment, useState } from 'react'

function Component() {
  const [value, setValue] = useState<number | null>(1234)

  return (<Fragment>
              <NumericField 
                  type="integer"
                  value={value}
                  onChange={(value) => {
                      setValue(value)
                  }} 
                  placeholder="Insert Number" /> 
         </Fragment>
  )
}

export default Component`,
  },
  type: {
    htmlContent: `<code><span class="line"><span style="color:#8839EF">import</span><span style="color:#7C7F93"> {</span><span style="color:#4C4F69"> NumericField </span><span style="color:#7C7F93">}</span><span style="color:#8839EF"> from</span><span style="color:#40A02B"> 'idraaj'</span></span>
<span class="line"><span style="color:#8839EF">import</span><span style="color:#7C7F93"> {</span><span style="color:#4C4F69"> Fragment </span><span style="color:#7C7F93">}</span><span style="color:#8839EF"> from</span><span style="color:#40A02B"> 'react'</span></span>
<span class="line"></span>
<span class="line"><span style="color:#8839EF">function</span><span style="color:#1E66F5;font-style:italic"> Component</span><span style="color:#7C7F93">()</span><span style="color:#7C7F93"> {</span><span style="color:#4C4F69"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#8839EF">  return</span><span style="color:#4C4F69"> (</span><span style="color:#04A5E5">&lt;</span><span style="color:#DF8E1D;font-style:italic">Fragment</span><span style="color:#04A5E5">&gt;</span></span>
<span class="line"><span style="color:#04A5E5">            &lt;</span><span style="color:#DF8E1D;font-style:italic">NumericField type</span><span style="color:#179299">=</span><span style="color:#40A02B">"</span><span style="color:#40A02B;font-style:italic">integer</span><span style="color:#40A02B">"</span><span style="color:#DF8E1D;font-style:italic"> placeholder</span><span style="color:#179299">=</span><span style="color:#40A02B">"</span><span style="color:#40A02B;font-style:italic">integer type</span><span style="color:#40A02B">"</span><span style="color:#DF8E1D;font-style:italic"> /</span><span style="color:#04A5E5">&gt;</span></span>
<span class="line"><span style="color:#04A5E5">            &lt;</span><span style="color:#DF8E1D;font-style:italic">NumericField</span></span>
<span class="line"><span style="color:#DF8E1D;font-style:italic">              type</span><span style="color:#179299">=</span><span style="color:#40A02B">"</span><span style="color:#40A02B;font-style:italic">float</span><span style="color:#40A02B">"</span></span>
<span class="line"><span style="color:#DF8E1D;font-style:italic">              placeholder</span><span style="color:#179299">=</span><span style="color:#40A02B">"</span><span style="color:#40A02B;font-style:italic">float type with comma</span><span style="color:#40A02B">"</span></span>
<span class="line"><span style="color:#DF8E1D;font-style:italic">              decimalSeparator</span><span style="color:#179299">=</span><span style="color:#40A02B">"</span><span style="color:#40A02B;font-style:italic">comma</span><span style="color:#40A02B">"</span></span>
<span class="line"><span style="color:#DF8E1D;font-style:italic">            /</span><span style="color:#04A5E5">&gt;</span></span>
<span class="line"><span style="color:#04A5E5">            &lt;</span><span style="color:#DF8E1D;font-style:italic">NumericField</span></span>
<span class="line"><span style="color:#DF8E1D;font-style:italic">              type</span><span style="color:#179299">=</span><span style="color:#40A02B">"</span><span style="color:#40A02B;font-style:italic">float</span><span style="color:#40A02B">"</span></span>
<span class="line"><span style="color:#DF8E1D;font-style:italic">              placeholder</span><span style="color:#179299">=</span><span style="color:#40A02B">"</span><span style="color:#40A02B;font-style:italic">float type with dot</span><span style="color:#40A02B">"</span></span>
<span class="line"><span style="color:#DF8E1D;font-style:italic">              decimalSeparator</span><span style="color:#179299">=</span><span style="color:#40A02B">"</span><span style="color:#40A02B;font-style:italic">dot</span><span style="color:#40A02B">"</span></span>
<span class="line"><span style="color:#DF8E1D;font-style:italic">            /</span><span style="color:#04A5E5">&gt;</span></span>
<span class="line"><span style="color:#04A5E5">         &lt;</span><span style="color:#DF8E1D;font-style:italic">/Fragment</span><span style="color:#04A5E5">&gt;</span></span>
<span class="line"><span style="color:#4C4F69">  )</span></span>
<span class="line"><span style="color:#4C4F69">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#4C4F69">export default Component</span></span>
<span class="line"></span>
<span class="line"></span></code>`,
    text: `import { NumericField } from 'idraaj'
import { Fragment } from 'react'

function Component() { 

  return (<Fragment>
            <NumericField type="integer" placeholder="integer type" />
            <NumericField
              type="float"
              placeholder="float type with comma"
              decimalSeparator="comma"
            />
            <NumericField
              type="float"
              placeholder="float type with dot"
              decimalSeparator="dot"
            />
         </Fragment>
  )
}

export default Component`,
  },
  spacing: {
    htmlContent: `<code><span class="line"><span style="color:#8839EF">import</span><span style="color:#7C7F93"> {</span><span style="color:#4C4F69"> NumericField </span><span style="color:#7C7F93">}</span><span style="color:#8839EF"> from</span><span style="color:#40A02B"> 'idraaj'</span></span>
<span class="line"><span style="color:#8839EF">import</span><span style="color:#7C7F93"> {</span><span style="color:#4C4F69"> Fragment </span><span style="color:#7C7F93">}</span><span style="color:#8839EF"> from</span><span style="color:#40A02B"> 'react'</span></span>
<span class="line"></span>
<span class="line"><span style="color:#8839EF">function</span><span style="color:#1E66F5;font-style:italic"> Component</span><span style="color:#7C7F93">()</span><span style="color:#7C7F93"> {</span><span style="color:#4C4F69"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#8839EF">  return</span><span style="color:#4C4F69"> (</span><span style="color:#04A5E5">&lt;</span><span style="color:#DF8E1D;font-style:italic">Fragment</span><span style="color:#04A5E5">&gt;</span></span>
<span class="line"><span style="color:#04A5E5">              &lt;</span><span style="color:#DF8E1D;font-style:italic">NumericField</span></span>
<span class="line"><span style="color:#DF8E1D;font-style:italic">                type</span><span style="color:#179299">=</span><span style="color:#40A02B">"</span><span style="color:#40A02B;font-style:italic">integer</span><span style="color:#40A02B">"</span></span>
<span class="line"><span style="color:#DF8E1D;font-style:italic">                enableSeparator</span><span style="color:#179299">=</span><span style="color:#7C7F93">{</span><span style="color:#4C4F69;font-style:italic">true</span><span style="color:#7C7F93">}</span></span>
<span class="line"><span style="color:#DF8E1D;font-style:italic">                placeholder</span><span style="color:#179299">=</span><span style="color:#40A02B">"</span><span style="color:#40A02B;font-style:italic">With Spacing</span><span style="color:#40A02B">"</span></span>
<span class="line"><span style="color:#DF8E1D;font-style:italic">            /</span><span style="color:#04A5E5">&gt;</span></span>
<span class="line"><span style="color:#04A5E5">            &lt;</span><span style="color:#DF8E1D;font-style:italic">NumericField type</span><span style="color:#179299">=</span><span style="color:#40A02B">"</span><span style="color:#40A02B;font-style:italic">integer</span><span style="color:#40A02B">"</span><span style="color:#DF8E1D;font-style:italic"> placeholder</span><span style="color:#179299">=</span><span style="color:#40A02B">"</span><span style="color:#40A02B;font-style:italic">No Spacing</span><span style="color:#40A02B">"</span><span style="color:#DF8E1D;font-style:italic"> /</span><span style="color:#04A5E5">&gt;</span></span>
<span class="line"><span style="color:#04A5E5">         &lt;</span><span style="color:#DF8E1D;font-style:italic">/Fragment</span><span style="color:#04A5E5">&gt;</span></span>
<span class="line"><span style="color:#4C4F69">  )</span></span>
<span class="line"><span style="color:#4C4F69">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#4C4F69">export default Component</span></span>
<span class="line"></span>
<span class="line"></span></code>`,
    text: `import { NumericField } from 'idraaj'
import { Fragment } from 'react'

function Component() { 

  return (<Fragment>
              <NumericField
                type="integer"
                enableSeparator={true}
                placeholder="With Spacing"
            />
            <NumericField type="integer" placeholder="No Spacing" />
         </Fragment>
  )
}

export default Component`,
  },
  mands: {
    htmlContent: `<code><span class="line"><span style="color:#8839EF">import</span><span style="color:#7C7F93"> {</span><span style="color:#4C4F69"> NumericField </span><span style="color:#7C7F93">}</span><span style="color:#8839EF"> from</span><span style="color:#40A02B"> 'idraaj'</span></span>
<span class="line"><span style="color:#8839EF">import</span><span style="color:#7C7F93"> {</span><span style="color:#4C4F69"> Fragment </span><span style="color:#7C7F93">}</span><span style="color:#8839EF"> from</span><span style="color:#40A02B"> 'react'</span></span>
<span class="line"></span>
<span class="line"><span style="color:#8839EF">function</span><span style="color:#1E66F5;font-style:italic"> Component</span><span style="color:#7C7F93">()</span><span style="color:#7C7F93"> {</span><span style="color:#4C4F69"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#8839EF">  return</span><span style="color:#4C4F69"> (</span><span style="color:#04A5E5">&lt;</span><span style="color:#DF8E1D;font-style:italic">Fragment</span><span style="color:#04A5E5">&gt;</span></span>
<span class="line"><span style="color:#04A5E5">            &lt;</span><span style="color:#DF8E1D;font-style:italic">NumericField type</span><span style="color:#179299">=</span><span style="color:#40A02B">"</span><span style="color:#40A02B;font-style:italic">integer</span><span style="color:#40A02B">"</span><span style="color:#DF8E1D;font-style:italic"> </span></span>
<span class="line"><span style="color:#DF8E1D;font-style:italic">               placeholder</span><span style="color:#179299">=</span><span style="color:#40A02B">"</span><span style="color:#40A02B;font-style:italic">Default Max</span><span style="color:#40A02B">"</span><span style="color:#DF8E1D;font-style:italic"> /</span><span style="color:#04A5E5">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#04A5E5">            &lt;</span><span style="color:#DF8E1D;font-style:italic">NumericField type</span><span style="color:#179299">=</span><span style="color:#40A02B">"</span><span style="color:#40A02B;font-style:italic">integer</span><span style="color:#40A02B">"</span><span style="color:#DF8E1D;font-style:italic"> </span></span>
<span class="line"><span style="color:#DF8E1D;font-style:italic">               max</span><span style="color:#179299">=</span><span style="color:#7C7F93">{</span><span style="color:#FE640B;font-style:italic">1000</span><span style="color:#7C7F93">}</span><span style="color:#DF8E1D;font-style:italic"> placeholder</span><span style="color:#179299">=</span><span style="color:#40A02B">"</span><span style="color:#40A02B;font-style:italic">Defined Max</span><span style="color:#40A02B">"</span><span style="color:#DF8E1D;font-style:italic"> /</span><span style="color:#04A5E5">&gt;</span></span>
<span class="line"><span style="color:#4C4F69">         </span></span>
<span class="line"><span style="color:#04A5E5">            &lt;</span><span style="color:#DF8E1D;font-style:italic">NumericField type</span><span style="color:#179299">=</span><span style="color:#40A02B">"</span><span style="color:#40A02B;font-style:italic">float</span><span style="color:#40A02B">"</span><span style="color:#DF8E1D;font-style:italic"> </span></span>
<span class="line"><span style="color:#DF8E1D;font-style:italic">              placeholder</span><span style="color:#179299">=</span><span style="color:#40A02B">"</span><span style="color:#40A02B;font-style:italic">Default Max and Scale</span><span style="color:#40A02B">"</span><span style="color:#DF8E1D;font-style:italic"> /</span><span style="color:#04A5E5">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#04A5E5">            &lt;</span><span style="color:#DF8E1D;font-style:italic">NumericField</span></span>
<span class="line"><span style="color:#DF8E1D;font-style:italic">              type</span><span style="color:#179299">=</span><span style="color:#40A02B">"</span><span style="color:#40A02B;font-style:italic">float</span><span style="color:#40A02B">"</span></span>
<span class="line"><span style="color:#DF8E1D;font-style:italic">              max</span><span style="color:#179299">=</span><span style="color:#7C7F93">{</span><span style="color:#FE640B;font-style:italic">1000</span><span style="color:#7C7F93">}</span></span>
<span class="line"><span style="color:#DF8E1D;font-style:italic">              scale</span><span style="color:#179299">=</span><span style="color:#7C7F93">{</span><span style="color:#FE640B;font-style:italic">2</span><span style="color:#7C7F93">}</span></span>
<span class="line"><span style="color:#DF8E1D;font-style:italic">              placeholder</span><span style="color:#179299">=</span><span style="color:#40A02B">"</span><span style="color:#40A02B;font-style:italic">Defined Max and Scale</span><span style="color:#40A02B">"</span></span>
<span class="line"><span style="color:#DF8E1D;font-style:italic">            /</span><span style="color:#04A5E5">&gt;</span></span>
<span class="line"><span style="color:#04A5E5">         &lt;</span><span style="color:#DF8E1D;font-style:italic">/Fragment</span><span style="color:#04A5E5">&gt;</span></span>
<span class="line"><span style="color:#4C4F69">  )</span></span>
<span class="line"><span style="color:#4C4F69">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#4C4F69">export default Component</span></span>
<span class="line"></span>
<span class="line"></span></code>`,
    text: `import { NumericField } from 'idraaj'
import { Fragment } from 'react'

function Component() { 

  return (<Fragment>
            <NumericField type="integer" placeholder="Default Max" />
            <NumericField type="integer" max={1000} placeholder="Defined Max" />
         
            <NumericField type="float" placeholder="Default Max and Scale" />
            <NumericField
              type="float"
              max={1000}
              scale={2}
              placeholder="Defined Max and Scale"
            />
         </Fragment>
  )
}

export default Component`,
  },
}

const Home = () => {
  const [value, setValue] = useState<number | null>(1234)

  return (
    <article className={styles.container}>
      <h1 className={styles.heading}>Idraaj - Numeric Field</h1>
      <p>An advanced HTML number input with enhanced features</p>
      <CodeBlock {...examples['installation']} />

      <Section
        title="Usage"
        description="This example demonstrates the difference between a standard HTML number input and the Idraaj numeric field."
      >
        <>
          <CodeBlock {...examples['usage']} />
          <div className={styles.showBox}>
            <NumericField type="integer" placeholder="Idraaj Numeric Field" />
            <input type="number" placeholder="Regular HTML Number Input" />
          </div>
        </>
      </Section>

      <Section title="Default">
        <>
          <CodeBlock {...examples['default']} />
          <NumericField
            type="integer"
            value={value}
            onChange={(value) => {
              setValue(value)
            }}
            placeholder="Insert Number"
          />
        </>
      </Section>

      <Section
        title="Spacing"
        description="Set enableSeparator to true to easily read the number with spacing applied."
      >
        <>
          <CodeBlock {...examples['spacing']} />
          <div className={styles.showBox}>
            <NumericField
              type="integer"
              enableSeparator={true}
              placeholder="With Spacing"
            />
            <NumericField type="integer" placeholder="No Spacing" />
          </div>
        </>
      </Section>

      <Section
        title="Types"
        description="The field supports integer for whole numbers and float for decimal numbers, where you can specify the decimal separator as either a dot or a comma."
      >
        <>
          <CodeBlock {...examples['type']} />
          <div className={styles.showBox}>
            <NumericField type="integer" placeholder="integer type" />
            <NumericField
              type="float"
              placeholder="float type with comma"
              decimalSeparator="comma"
            />
            <NumericField
              type="float"
              placeholder="float type with dot"
              decimalSeparator="dot"
            />
          </div>
        </>
      </Section>

      <Section
        title="Max and Scale"
        description="Max is used to define the maximum value that can be entered, while scale applies only to floats, specifying the number of digits allowed after the decimal point."
      >
        <>
          <CodeBlock {...examples['mands']} />
          <div className={styles.showBox}>
            <NumericField type="integer" placeholder="Default Max" />
            <NumericField type="integer" max={1000} placeholder="Defined Max" />
          </div>
          <div className={styles.showBox}>
            <NumericField type="float" placeholder="Default Max and Scale" />
            <NumericField
              type="float"
              max={1000}
              scale={2}
              placeholder="Defined Max and Scale"
            />
          </div>
        </>
      </Section>
    </article>
  )
}

export default Home
