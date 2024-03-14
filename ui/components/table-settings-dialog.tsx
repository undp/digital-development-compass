import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Dialog, Tab, Transition } from "@headlessui/react";
import omit from "lodash/omit";
import React, { useMemo, useState } from "react";
import { GoGear } from "react-icons/go";
import { HiDotsVertical } from "react-icons/hi";
import { Toggle } from "./toggle";

interface SortableItemProps {
  id: string;
  setting: ColumnSetting;
  onChange: (enabled: boolean) => void;
}

function SortableItem(props: SortableItemProps) {
  const { id, setting, onChange } = props;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <li className="flex items-center space-x-1" ref={setNodeRef} style={style}>
      <button
        className="flex items-center text-sm text-gray-400 cursor-move"
        {...attributes}
        {...listeners}
      >
        <HiDotsVertical />
      </button>
      <Toggle
        id={setting.name}
        enabled={setting.visible}
        label={setting.name}
        onChange={(enabled) => {
          onChange(enabled);
        }}
      />
    </li>
  );
}

function InnerDialog(props: Props) {
  const {
    columnSettings,
    onColumnSettingsChange,
    displaySettings,
    onDisplaySettingsChange,
  } = props;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);

      const moved = arrayMove(items, oldIndex, newIndex);
      onColumnSettingsChange(moved.map((i) => omit(i, "id")));
    }
  };

  const items = useMemo(() => {
    return columnSettings.map((setting) => {
      return {
        ...setting,
        id: setting.name,
      };
    });
  }, [columnSettings]);

  return (
    <Tab.Group>
      <Tab.List className="flex border-b" aria-label="Settings">
        {["Columns", "Display"].map((group) => (
          <Tab key={group} as={React.Fragment}>
            {({ selected }) => (
              <button
                className={`${
                  selected
                    ? "text-brand-blue border-brand-blue opacity-100"
                    : ""
                } border-transparent opacity-50 flex-1 p-3 focus:outline-none focus:ring text-xs uppercase tracking-wider font-medium border-b-2 transition-all hover:opacity-100`}
              >
                {group.toLowerCase()}
              </button>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <div className="p-4">
            <p className="select-none font-medium text-sm inline-block text-gray-600">
              Column Settings
            </p>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
              >
                <ul className="space-y-2 mt-2">
                  {items.map(({ id, ...setting }) => (
                    <SortableItem
                      onChange={(enabled) => {
                        onColumnSettingsChange(
                          columnSettings.map((s) => {
                            if (s.key !== setting.key) {
                              return s;
                            } else {
                              return { ...s, visible: enabled };
                            }
                          })
                        );
                      }}
                      setting={setting}
                      key={id}
                      id={id}
                    />
                  ))}
                </ul>
              </SortableContext>
            </DndContext>
          </div>
        </Tab.Panel>
        <Tab.Panel>
          <div className="p-4 space-y-4">
            <Toggle
              id="heatmap"
              enabled={displaySettings.showHeatmap}
              label="Show Heatmap"
              onChange={(enabled) => {
                onDisplaySettingsChange({
                  ...displaySettings,
                  showHeatmap: enabled,
                });
              }}
            />
            <Toggle
              id="confidence"
              enabled={displaySettings.showConfidence}
              label="Show Confidence Score"
              onChange={(enabled) => {
                onDisplaySettingsChange({
                  ...displaySettings,
                  showConfidence: enabled,
                });
              }}
            />
          </div>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}

interface Props {
  columnSettings: ColumnSetting[];
  onColumnSettingsChange: (settings: ColumnSetting[]) => void;
  displaySettings: DisplaySettings;
  onDisplaySettingsChange: (setings: DisplaySettings) => void;
}

export function TableSettingsDialog(props: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-white border border-b-2 rounded py-1 px-3 text-gray-600 focus:outline-none focus:ring relative text-sm font-medium inline-flex items-center"
      >
        <GoGear />
        <span className="ml-2">Settings</span>
      </button>

      <Transition appear show={open}>
        <Dialog
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={() => setOpen(false)}
        >
          <Transition.Child
            as={"div"}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/10" />
          </Transition.Child>

          <div className="flex justify-end min-h-screen">
            <Transition.Child
              as={"div"}
              className="relative bg-white min-w-[300px] md:min-w-[400px] w-1/3 drawer"
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-x-8"
              enterTo="opacity-100 translate-x-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-8"
            >
              <InnerDialog {...props} />
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
