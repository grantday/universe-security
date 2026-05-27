"use client";

import { useEffect, useState } from "react";
import { studioPut, useStudioFetch } from "@/components/studio/useStudioFetch";

type ItemsPayload<T> = { items: T[] };

export function useStudioItems<T>(apiPath: string, loginNext: string) {
  const { data, setData, status, setStatus, loading } = useStudioFetch<ItemsPayload<T>>(apiPath, loginNext);
  const [items, setItems] = useState<T[] | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState<T | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data?.items) setItems(data.items);
  }, [data]);

  const list = items ?? [];

  function closeEdit(cancelNew?: () => void) {
    if (cancelNew) cancelNew();
    setEditIndex(null);
    setDraft(null);
  }

  function applyDraft() {
    if (editIndex === null || !draft) return;
    const next = [...list];
    next[editIndex] = draft;
    setItems(next);
    setEditIndex(null);
    setDraft(null);
  }

  async function save(successMessage: string) {
    const toSave = items ?? list;
    setSaving(true);
    setStatus("");
    const result = await studioPut<ItemsPayload<T>>(apiPath, { items: toSave });
    setSaving(false);
    if (!result.ok) {
      setStatus(result.error);
      return;
    }
    setData(result.data);
    setItems(result.data.items);
    setStatus(successMessage);
  }

  function moveItem(from: number, to: number) {
    if (!items || to < 0 || to >= list.length) return;
    const next = [...list];
    const [removed] = next.splice(from, 1);
    next.splice(to, 0, removed!);
    setItems(next);
    if (editIndex === from) setEditIndex(to);
    else if (editIndex === to) setEditIndex(from);
  }

  function moveUp(index: number) {
    moveItem(index, index - 1);
  }

  function moveDown(index: number) {
    moveItem(index, index + 1);
  }

  return {
    list,
    items,
    setItems,
    loading,
    status,
    setStatus,
    editIndex,
    setEditIndex,
    draft,
    setDraft,
    saving,
    closeEdit,
    applyDraft,
    save,
    moveUp,
    moveDown,
  };
}
