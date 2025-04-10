import React from 'react'

const Footer = () => {
    return (
        <footer className='py-6 text-white bg-black border-t border-gray-800 md:px-8 md:py-0'>
            <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-sm leading-loose text-center text-balance text-muted-foreground md:text-left">
                    Built by {" "}
                    <a href="https://github.com/pratyushsinha213" target="_blank" className='font-medium underline underline-offset-4'>
                        you
                    </a>
                    . The source code is available on{" "}
                    <a href="https://github.com/pratyushsinha213/netflix-clone" target="_blank" className='font-medium underline underline-offset-4'>
                        GitHub
                    </a>
                    .
                </p>
            </div>
        </footer>
    )
}

export default Footer