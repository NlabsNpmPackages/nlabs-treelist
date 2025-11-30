# nlabs-treelist

A powerful, customizable TreeList component for Angular with theme support, dynamic loading, and flexible configurations.

## Features

- ✨ **Theme Support**: Built-in Light/Dark/System theme switcher
- 🎨 **Customizable**: Highly configurable with multiple input options
- 🖼️ **Image Support**: Display images next to nodes (default or custom template)
- 🎯 **Custom Templates**: Full control over node content rendering
- ✏️ **CRUD Actions**: Built-in Add/Edit/Delete buttons with events
- 🔄 **Dynamic Loading**: Lazy load children nodes on demand
- 📦 **Standalone Component**: No module imports required
- 🎯 **TypeScript**: Full TypeScript support
- 🌳 **Hierarchical Data**: Display tree structures with ease
- ⚡ **Auto-expand & Auto-select**: Optional automatic behaviors
- 🎭 **Multiple Name Click Actions**: Configure what happens when clicking node names
- 🔧 **Flexible Field Mapping**: Map your data fields dynamically

## Installation

```bash
npm install nlabs-treelist
```

## Usage

### Basic Example

```typescript
import { Component } from '@angular/core';
import { NlabsTreeListComponent, TreeNode } from 'nlabs-treelist';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NlabsTreeListComponent],
  template: `
    <nlabs-tree-list
      [nodes]="treeData"
      [theme]="'light'"
      (selectedIdsChange)="onSelectionChange($event)"
    ></nlabs-tree-list>
  `
})
export class AppComponent {
  treeData: TreeNode[] = [
    {
      id: '1',
      name: 'Root Node',
      children: [
        { id: '1-1', name: 'Child 1', parentId: '1', children: [] },
        { id: '1-2', name: 'Child 2', parentId: '1', children: [] }
      ]
    }
  ];

  onSelectionChange(selectedIds: string[]) {
    console.log('Selected IDs:', selectedIds);
  }
}
```

## Advanced Examples

### With Images (Simple)

```typescript
import { NlabsTreeListComponent } from 'nlabs-treelist';

@Component({
  template: `
    <nlabs-tree-list
      [nodes]="organizationNodes"
      [showImage]="true"
      [imageField]="'imageUrl'"
      [theme]="'light'"
    ></nlabs-tree-list>
  `
})
export class AppComponent {
  organizationNodes = [
    {
      id: '1',
      name: 'Acme Corp',
      imageUrl: 'https://example.com/logo.png',
      children: []
    }
  ];
}
```

### Custom Template (Advanced)

```typescript
@Component({
  template: `
    <nlabs-tree-list
      [nodes]="nodes"
      [theme]="'light'"
    >
      <ng-template #nodeContent let-node>
        <div class="custom-node">
          <img [src]="node.imageUrl" [alt]="node.name" />
          <div class="node-info">
            <span class="name">{{ node.name }}</span>
            <span class="subtitle">{{ node.department }}</span>
          </div>
        </div>
      </ng-template>
    </nlabs-tree-list>
  `
})
export class AppComponent {
  nodes = [
    {
      id: '1',
      name: 'Engineering',
      department: 'Technology',
      imageUrl: '/assets/eng.png',
      children: []
    }
  ];
}
```

### Dynamic Field Mapping

```typescript
// Your API returns data with different field names
interface ApiOrganization {
  uuid: string;
  title: string;
  logoUrl: string;
  parentUuid?: string;
  subOrganizations?: ApiOrganization[];
}

@Component({
  template: `
    <nlabs-tree-list
      [nodes]="apiData"
      [idField]="'uuid'"
      [nameField]="'title'"
      [imageField]="'logoUrl'"
      [parentIdField]="'parentUuid'"
      [childrenField]="'subOrganizations'"
      [showImage]="true"
    ></nlabs-tree-list>
  `
})
export class AppComponent {
  apiData: ApiOrganization[] = [];
}
```

### CRUD Operations

```typescript
@Component({
  template: `
    <nlabs-tree-list
      [nodes]="nodes"
      [showActions]="true"
      [showImage]="true"
      (nodeAdd)="onAddChild($event)"
      (nodeEdit)="onEdit($event)"
      (nodeDelete)="onDelete($event)"
    ></nlabs-tree-list>
  `
})
export class AppComponent {
  nodes: TreeNode[] = [];

  onAddChild(parentNode: TreeNode) {
    // Add a child to the parent node
    const newChild = {
      id: crypto.randomUUID(),
      name: 'New Organization',
      imageUrl: 'https://example.com/new.png',
      children: []
    };

    if (!parentNode.children) {
      parentNode.children = [];
    }
    parentNode.children.push(newChild);
    parentNode.expanded = true;

    // Optionally call your API
    // this.apiService.createOrganization(newChild).subscribe();
  }

  onEdit(node: TreeNode) {
    // Edit the node
    node.name = 'Updated Name';

    // Optionally call your API
    // this.apiService.updateOrganization(node).subscribe();
  }

  onDelete(node: TreeNode) {
    // Remove from tree
    this.removeNodeFromTree(this.nodes, node.id);

    // Optionally call your API
    // this.apiService.deleteOrganization(node.id).subscribe();
  }

  private removeNodeFromTree(nodes: TreeNode[], nodeId: string): boolean {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === nodeId) {
        nodes.splice(i, 1);
        return true;
      }
      if (nodes[i].children?.length) {
        if (this.removeNodeFromTree(nodes[i].children!, nodeId)) {
          return true;
        }
      }
    }
    return false;
  }
}
```

## API Reference

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `nodes` | `any[]` | `[]` | The tree data to display |
| `idField` | `string` | `'id'` | Field name for node ID |
| `nameField` | `string` | `'name'` | Field name for node name |
| `imageField` | `string` | `'imageUrl'` | Field name for image URL |
| `parentIdField` | `string` | `'parentId'` | Field name for parent ID |
| `childrenField` | `string` | `'children'` | Field name for children array |
| `showImage` | `boolean` | `false` | Show images in default template |
| `showActions` | `boolean` | `false` | Show Add/Edit/Delete action buttons |
| `theme` | `'light' \| 'dark'` | `'light'` | Theme when `showThemeSwitcher` is false |
| `showThemeSwitcher` | `boolean` | `false` | Show theme switcher UI (Light/Dark/System) |
| `expandOnSelect` | `boolean` | `false` | Auto-expand node when checkbox is selected |
| `selectChildren` | `boolean` | `false` | Auto-select all children when parent is selected |
| `nameClickAction` | `'toggle' \| 'select' \| 'both'` | `'toggle'` | Action when clicking node name |
| `loadChildrenFn` | `(nodeId: string) => Promise<TreeNode[]>` | `undefined` | Function to load children dynamically |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `selectedIdsChange` | `EventEmitter<string[]>` | Emits selected node IDs |
| `themeChange` | `EventEmitter<'light' \| 'dark'>` | Emits when theme changes |
| `nodeExpanded` | `EventEmitter<TreeNode>` | Emits when node is expanded |
| `nodeCollapsed` | `EventEmitter<TreeNode>` | Emits when node is collapsed |
| `nodeAdd` | `EventEmitter<any>` | Emits when Add button clicked (parent node) |
| `nodeEdit` | `EventEmitter<any>` | Emits when Edit button clicked (node) |
| `nodeDelete` | `EventEmitter<any>` | Emits when Delete button clicked (node) |

### TreeNode Interface

```typescript
interface TreeNode {
  id: string;
  parentId?: string;
  name: string;
  imageUrl?: string;
  children?: TreeNode[];
  expanded?: boolean;
  checked?: boolean;
  hasChildren?: boolean;
  [key: string]: any; // Support for custom fields
}
```

## License

MIT
