const hoverable = document.getElementById('hoverable');
hoverable.addEventListener('mouseover', () => {
	hoverable.style.backgroundColor ='transparent';
	hoverable.style.textDecoration='none';
	hoverable.style.cursor='pointer;'
});
hoverable.addEventListener('mouseout', () => {
	hoverable.style.backgroundColor='transparent';
	hoverable.style.textDecoration='none;'
	
})