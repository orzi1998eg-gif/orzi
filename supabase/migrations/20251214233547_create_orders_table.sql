/*
  # Create Orders Table

  1. New Tables
    - `orders`
      - `id` (uuid, primary key) - Unique order identifier
      - `name` (text) - Customer name
      - `phone` (text) - Customer phone number
      - `governorate` (text) - Selected governorate (Cairo, Giza, Alexandria)
      - `area` (text) - Selected area within governorate
      - `full_address` (text) - Complete delivery address
      - `bracelet_style` (text) - Selected bracelet style (straight or curved)
      - `bracelet_image` (text) - Image path of selected bracelet
      - `created_at` (timestamptz) - Order creation timestamp
      - `status` (text) - Order status (pending, contacted, completed)
  
  2. Security
    - Enable RLS on `orders` table
    - Add policy for inserting orders (public access for form submission)
    - Add policy for viewing orders (authenticated users only)
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  governorate text NOT NULL,
  area text NOT NULL,
  full_address text NOT NULL,
  bracelet_style text NOT NULL,
  bracelet_image text NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending'
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert orders"
  ON orders
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (true);