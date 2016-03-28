function TabContainer(parent)
{
	//Parent
	if(parent === undefined)
	{
		this.parent = document.body;
	}
	else
	{
		this.parent = parent;
	}
	
	//ID
	var id = "tab_container" + TabContainer.id;
	TabContainer.id++;

	//Create element
	this.element = document.createElement("div");
	this.element.id = id;
	this.element.style.position = "absolute";
	this.element.className = "container";
	
	//Element atributes
	this.size = new THREE.Vector2(0,0);
	this.position = new THREE.Vector2(0,0);
	this.visible = true;
	
	//Tab Options
	this.options_size = new THREE.Vector2(150, 30);
	this.options_selected = 0;
	this.options_closeable = false;
	this.options = [];

	//Add element to document
	this.parent.appendChild(this.element);
}

//TabContainer conter
TabContainer.id = 0;

//Functions Prototype
TabContainer.prototype.update = update;
TabContainer.prototype.updateInterface = updateInterface;
TabContainer.prototype.destroy = destroy;
TabContainer.prototype.addOption = addOption;
TabContainer.prototype.removeOption = removeOption;
TabContainer.prototype.updateOptionIndex = updateOptionIndex;
TabContainer.prototype.selectOption = selectOption;

//Select option
function selectOption(index)
{
	this.options_selected = index;
	this.updateInterface();
}

//Add tab
function addOption(name, image, closeable)
{
	var option = new TabOption(name, image, closeable, this, this.options.length);
	this.options.push(option);
	return option;
}

//Remove tab
function removeOption(index)
{
	if(index >= 0 && index < this.options.length)
	{
		this.options[index].destroy();
		this.options.splice(index, 1);

		this.updateOptionIndex();
		this.updateInterface();
	}
}

//Update options index
function updateOptionIndex()
{
	for(var i = 0; i < this.options.length; i++)
	{
		this.options[i].index = i;
	}
}

//Remove element
function destroy()
{
	this.parent.removeChild(this.element);
}

//Update TabContainer
function update()
{
	for(var i = 0; i < this.options.length; i++)
	{
		this.options[i].update();
	}
}

//Update division Size
function updateInterface()
{
	for(var i = 0; i < this.options.length; i++)
	{
		if(this.options_selected == i)
		{
			this.options[i].visible = true;
		}
		else
		{
			this.options[i].visible = false;
		}
		
		this.options[i].size.set(this.size.x, this.size.y);
		this.options[i].updateInterface();
	}

	if(this.visible)
	{
		this.element.style.visibility = "visible";
	}
	else
	{
		this.element.style.visibility = "hidden";
	}

	this.element.style.top = this.position.y + "px";
	this.element.style.left = this.position.x + "px";
	this.element.style.width = this.size.x + "px";
	this.element.style.height = this.size.y + "px";
}