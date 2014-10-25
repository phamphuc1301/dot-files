" Set 'nocompatible' to ward off unexpected things that your distro might
" have made, as well as sanely reset options when re-sourcing .vimrc
set nocompatible

" use visual bell instead of beeping
"set vb

" incremental search. 
" Vim will start searching when you type the first character of the search string. As you type in more characters, the search is refined
set incsearch

" no highlight search
"set nohls

" syntax highlighting
"set bg=light
syntax on

" autoindent
"autocmd FileType perl set autoindent|set smartindent
set autoindent
set smartindent

" 4 space tabs
"autocmd FileType perl set tabstop=4|set shiftwidth=4|set expandtab|set softtabstop=4
set tabstop=4
set shiftwidth=4
set expandtab
set softtabstop=4

" show matching brackets
"autocmd FileType perl set showmatch
set showmatch

" show line numbers
"autocmd FileType perl set number
set number

" check perl code with :make
"autocmd FileType perl set makeprg=perl\ -c\ %\ $*
"autocmd FileType perl set errorformat=%f:%l:%m
"autocmd FileType perl set autowrite

" dont use Q for Ex mode
"map Q :q

" make tab in v mode ident code
"vmap <tab> >gv
"vmap <s-tab> <gv

" make tab in normal mode ident code
"nmap <tab> I<tab><esc>
"nmap <s-tab> ^i<bs><esc>

" paste mode - this will avoid unexpected effects when you
" cut or copy some text from one window and paste it in Vim.
"set pastetoggle=<F11>

" comment/uncomment blocks of code (in vmode)
"vmap _c :s/^/#/gi<Enter>
"vmap _C :s/^#//gi<Enter>

" my perl includes pod
"let perl_include_pod = 1

" syntax color complex things like @{${"foo"}}
"let perl_extended_vars = 1

" Tidy selected lines (or entire file) with _t:
"nnoremap <silent> _t :%!perltidy -q<Enter>
"vnoremap <silent> _t :!perltidy -q<Enter>

" remove toolbar
"set guioptions-=T

" show current row and column at bottom screen
set ruler

"set virtualedit=all

"map <C-J> <C-W>j<C-W>_
"map <C-K> <C-W>k<C-W>_

" move between tab
"map <C-L> :tabn<cr>
"map <C-H> :tabp<cr>

" set minimum window height to 0
"set wmh=0

" display command 
set showcmd

" scheme and font
"colorscheme wombat
"set guifont=Andale\ Mono:h18
" for mac os x 
"set guifont=Andale\ Mono:h22
" for linux
"set guifont=DejaVu\ Sans\ Mono\ 13
if has("gui_macvim")
  set guifont=Monaco:h16
endif

" automatically change the current directory
"set autochdir

"map <F9> :!perl -Mstrict "%"<cr>
"map <F8> :!python "%"<cr>

" Turn on word wrapping
set wrap
set linebreak
set nolist

" Moving around through wrapped lines
vmap <D-j> gj
vmap <D-k> gk
vmap <D-4> g$
vmap <D-6> g^
vmap <D-0> g^
nmap <D-j> gj
nmap <D-k> gk
nmap <D-4> g$
nmap <D-6> g^
nmap <D-0> g^

" Enable md syntax
au BufRead,BufNewFile *.md set filetype=markdown